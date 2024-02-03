import { SyntheticEvent, useRef, createRef, useState, useEffect } from "react";
import { CartType } from "../../graphql/cart";
import CartItem from "./item";
import WillPay from "../willPay";
import { checkedCartState } from "../../recoils/cart";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const CartList = ({ items }: { items: CartType[] }) => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
  const [formData, setFormData] = useState<FormData>();

  const setItemCheckedFromAll = (targetInput: HTMLInputElement) => {
    //전체 선택 체크박스를 선택하면 그것의 체크 or 해제 여부에 따라 아이템들 체크를 바꾸어줌
    const allChecked = targetInput.checked;
    checkboxRefs.forEach((inputElem) => {
      if (inputElem.current) inputElem.current!.checked = allChecked;
    });
  };

  const setItemChecked = () => {
    // 개별아이템 선택시
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;
    //아이템들이 전부 체크되면 전체 선택 체크박스를 바꾸어줌
    const allChecked = selectedCount === items.length;
    formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked =
      allChecked;
  };

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e?.target as HTMLInputElement;

    if (targetInput.classList.contains("select-all")) {
      setItemCheckedFromAll(targetInput);
    } else {
      setItemChecked();
    }

    const data = new FormData(formRef.current);
    setFormData(data);
  };

  const handleSubmit = () => {
    if (checkedCartData.length) {
      navigate("/payment");
    } else {
      alert("결제할 대상이 없어요");
    }
  };

  //페이지 처음 호출할때 기존 체크박스 정보 가져옴
  useEffect(() => {
    console.log("페이지 랜더링");
    console.log(checkedCartData);
    checkboxRefs.map((ref) => {
      console.log(ref);
    });
    checkedCartData.forEach((item) => {
      const itemRef = checkboxRefs.find(
        (ref) => ref.current!.dataset.id === item.id
      );
      if (itemRef) itemRef.current!.checked = true;
    });
    setItemChecked();
  }, []);

  //전체 체크박스에 대한 정보는 form 데이터에 들어있음
  //장바구니에 담긴 상품목록과 form 데이터가 바뀔때마다 새롭게 호출해서 체크박스 정보 저장
  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
      if (ref.current!.checked) res.push(items[i]);
      return res;
    }, []);
    setCheckedCartData(checkedItems);
  }, [items, formData]);

  return (
    <div>
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input className="select-all" name="select-all" type="checkbox" />
        </label>
        <ul>
          {items.map((item, i) => (
            <CartItem {...item} key={item.id} ref={checkboxRefs[i]} />
          ))}
        </ul>
      </form>
      <WillPay submitTitle="결제창으로" handleSubmit={handleSubmit} />
    </div>
  );
};
export default CartList;
