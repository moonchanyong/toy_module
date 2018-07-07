# TikTok

## 목표

### 이벤트가 틱 하면 핸들러가 톡하는 옵저버 패턴

* delegate를 document로 할 수 있을까? document로 다위임해서 사용해버리고 관리면에서 편하게만 만든다면 ?? 관리가 편하게 만들면 좋을 것 같다.

* 이벤트리스너: 서버(돔에서 오는 이벤트는 자원)

* 이벤트핸들러: 클라이언트(자원이 오면 자원을 사용하여 처리한다)

* CS모델에서 application layer의 http를 자주이용, http는 URI를 통해 자원을 표현하게 되어있다.
  + URI는 서로에게 자원을 제공, 통신하기 위한 약속된 주소이다.
  + 이처럼 URI처럼 키워드를 통해 제공하는 이벤트를 정해놓으면, delegate를 위한 코드 작성을 따로 더 안하고 간단하게 추가 제거 할 수 있게하자
  + 함수형 라이브러리 partial처럼 구현해보자.

## troubleshooting

### 갓 만든 따끈따끈한 같은 태그의 돔 두개를 ===로 비교하면 왜 다를까???

#### 궁금해서 찾은 생각의 흐름

* Dom을 키값으로 쓰고싶엇는데 타입이 키값으로 설정이 됨 => Dom의 outerHTML로 키값을 설정 => 똑같으면 같은 태그로 인식
=> 그런데 Dom은 === 하면 false 가뜬다 => 유니크 아이디값이있나 ?? => 돔 속성을 보니 없다. => 찾아보자

```
function convertToObject(obj) {
  let ret = {}
  for (var p in obj) {
    ret[p] = obj[p];
  }
  return ret;
}

function diff(obj1, obj2) {
	let ret = []
	for(let o in obj2){
		if(obj1[o] !== obj2[o]) ret.push(o);
    }
	return ret
}

<!-- 차이나는 속성 ["dataset", "style", "classList", "attributes", "children", "attributeStyleMap", "childNodes"] -->
<!-- 이를 내부를 비교해봣는데 같은데 prototype의 constructor에서 Symbol을 사용함  -->
```
### 결론 **Symbol을 써서 결국 서로다른 돔을 구분**
