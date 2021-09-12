# Twitter

## 어려웠던 점
1. `transform: translate(...)`가 적용된 엘리먼트의 자식 트리에 속한 엘리먼트에 `position: fixed` 스타일이 적용된 경우 작동하지 않아 모달이 깨지는 문제가 있었음. `Portal`을 구현해서 해결함.
