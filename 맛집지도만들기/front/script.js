/*
1.   지도 생성 & 확대 축소 컨트롤러
2. 더미데이터 준비하기 (제목, 주소, url, 카테고리)
3. 여러개 마커 찍기
    - 주소 - 좌표 변환
4. 마커에 인포윈도우 붙이기
    - 마커에 클릭 이벤트로 인포윈도우
    - url에서 섬네일 따기
    - 클릭한 마커로 지도 센터 이동
5. 카테고리 분류
*/

//1.
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.54, 126.96), //지도의 중심좌표. 서울 한가운데로 세팅
	level: 8 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//2. 
//서버에서 데이터를 불러오기 
async function getDataSet(category) {
  //만약 category를 정하지 않으면 통으로 다가져옴 
  let qs = category;
  if (!qs) {
    qs = "";
  }

  const dataSet = await axios({
    method: "get", // http method
    url: `http://localhost:3000/res?category=${qs}`,
    headers: {}, // packet header
    data: {}, // packet body
  });
  console.log(dataSet);
  return dataSet.data.result;
}

getDataSet();



//3
// 주소-좌표 변환 객체를 생성합니다
/*아래코드를 더 깔끔하게 비동기 처리함 
var geocoder = new kakao.maps.services.Geocoder();
for (var i = 0; i < dataset.length; i ++) {    
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(dataset[i].address, function(result, status) {
    // 정상적으로 검색이 완료됐으면 
    if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: coords, // 마커를 표시할 위치
        });
    } 
    });   
}*/

//버전2
var geocoder = new kakao.maps.services.Geocoder();
function getCoordsByAddress(address) {
  // promise 형태로 반환
  return new Promise((resolve, reject) => {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        return resolve(coords);
      }
      reject(new Error("getCoordsByAddress Error: not valid Address"));
    });
  });
}

/*
async function setMap() {
  for (var i = 0; i < dataset.length; i++) {
    let position = await getCoordsByAddress(dataset[i].address);
    console.log(position);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: position,
    });
  }
}
setMap(); 4장의 기능이랑 합침
*/ 

//4. 
async function setMap(dataset) {
    for (var i = 0; i < dataset.length; i++) {
      let position = await getCoordsByAddress(dataset[i].address);
  
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: position, // 마커를 표시할 위치
      });
      
      //마커생성될때마다 배열에 넣어줌
      markerArray.push(marker);



      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: getContent(dataset[i]), // 인포윈도우에 표시할 내용
        disableAutoPan: true, // 인포윈도우를 열 때 지도가 자동으로 패닝하지 않을지의 여부 (기본값: false)
      });
  
      //생성될때마다 inforwindow 배열에 남음 
      infowindowArray.push(infowindow);
  
      // 마크를 누르면 실행됨 
      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(
        marker,
        "click",
        makeOverListener(map, marker, infowindow, position)
      );
      // 커스텀: 맵을 클릭하면 현재 나타난 인포윈도우가 없어지게끔
      kakao.maps.event.addListener(map, "click", makeOutListener(infowindow));
    }
}
  
// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow, position) {
    return function () {
      // 1. 클릭시 다른 인포윈도우 닫기
      closeInfowindow();
      infowindow.open(map, marker);
      // 2. 클릭한 곳으로 짇 중심 이동하기
      map.panTo(position);
    };
}
  

// 1. 클릭시 다른 인포윈도우 닫기
let infowindowArray = [];
function closeInfowindow() {
    for (let infowindow of infowindowArray) {
      infowindow.close();
    }
}
  
// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
}
  
// HTML 코드로 바꾸는 함수 
// 인포윈도우 모양 가공하기 
function getContent(data) {
    console.log(data);

    let videoId = "";
    let replaceUrl = data.urlres;
    //replaceUrl = replaceUrl.replace("https://youtu.be/", "");
    //replaceUrl = replaceUrl.replace("https://www.youtube.com/embed/", "");
    //replaceUrl = replaceUrl.replace("https://www.youtube.com/watch?v=", "");
    //videoId = replaceUrl.split("&")[0];
  
    const result = `<div class="infowindow">
      <div class="infowindow-img-container">
        <img src="https://img.youtube.com/vi/${videoId}/sddefault.jpg" class="infowindow-img" alt="...">
      </div>
      <div class="infowindow-body">
        <h5 class="infowindow-title">${data.nameres}</h5>
        <p class="infowindow-text">${data.address}</p>
        <a href="${replaceUrl}" target="_blank" class="infowindow-btn">사이트</a>
      </div>
    </div>`;
    return result;
}
  
async function setting() {
  try{
    const dataSet = await getDataSet();
    setMap(dataSet);
  }catch(error){
    console.error(error);
  }
}
setting()

//5.
// 카테고리
const categoryMap = {
    korea: "한식",
    china: "중식",
    japan: "일식",
    america: "양식",
    wheat: "분식",
    bread: "베이커리",
    cafe: "카페",
    etc: "기타",
};

const categorylist = document.querySelector(".category-list");
categorylist.addEventListener("click", categroyHandler);

async function categroyHandler(event){
    //console.log(event.target);
    const categoryId = event.target.id;
    const category = categoryMap[categoryId];

    try{
      //데이터분류
      let categorizedDataset = await getDataSet(category);
      //기존마커삭제
      closeMarker();
      closeInfowindow();
      setMap(categorizedDataset);
    }catch(error){
      console.log(error);
    }
}

let markerArray = [];
function closeMarker(){
    for (marker of markerArray){
        marker.setMap(null);
    }
}