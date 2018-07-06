# TikTok

## 목표

* 이벤트가 틱 하면 핸들러가 톡하는 옵저버 패턴

* 등록한 핸들러 제거가 가능하다.

* 이벤트 리스너 - 이벤트 핸들러 관계에서 이벤트 리스너 - 틱톡 - 이벤트핸들러관계로 해서 이벤트 등록시 편리하게 한다.

* delegate를 document로 할 수 있을까? document로 다위임해서 사용해버리고 관리면에서 편하게만 만든다면 ??


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
