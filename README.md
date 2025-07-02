# BurnFit Frontend Project
> This is my first React Native App Project, so ill figure more learning about it.
> and ill never use ChatBot, Copilot, most of Error cases, not googling it

> 리액트 네이티브로 개발하는 첫 프로젝트입니다. 따라서 리액트 네이티브가 어떤 개발 도구인지 배우는 것에 더욱 초점을 둘 것입니다.
> AI 도구를 사용하지 말라는 내용이 따로 없었으나, 처음 배우고, 사용하는 것이니만큼, 이를 사용하지 않는 것이 평가에도, 배우는 데에도 좋을 것이라 생각하여, 사용하지 않을 것입니다.
> 추가로, 에러 발생 시 최대한 구글 등에 바로 검색해보지 않을 것입니다.

## 요구 사항 분석
- 세 레벨으로 분류된 기능 개발 사항이 나뉘어져 있으며, 일반적으로 User 가 사용할 수 있는 가장 기본적인 기능의 구현이 예제로 나와 있음
- 기능을 구현할 시 어떤 객체?, 혹은 라이브러리를 사용할지 지정해 두었음
- 과제의 구현은 본인이 가능한 수준까지 구현해달라는 내용이 있었으며, 프론트엔드쪽 개발 경험이 전무한 나에게 가장 해당되는 사항임
- 개인이 가진 기술과 코드 작성 스타일을 위조로 볼 것이라 하였음. 
    - 코드 작성 스타일은 회사에 맞출 수 있기도 하고, 간단한 기능 개발 프로젝트이므로, 사실상 Git 을 이용한, 형상관리, 커밋 스타일, 문제 접근 방식 등을 위주로 볼 것일 가능성이 높음
    - 검토 담당자의 시간을 아끼려면 조금 못생겨도 개발 과정 중 생각과 세부 내용을 어느 정도는 정리하는 것이 좋아 보임 (깃헙에서 update 기록을 자세히 남기는 것도 가능할텐데.. 써본 적이 없어서 README 로 대체..)

## 프로젝트 개발 과정

### 기본 환경 구성
- 처음 설치 시 블로그에서 JDK 11 을 깔길래 따라했다가, 에러 코드 보고 17로 업데이트
- 처음 구성 시 기본 디렉토리가 내가 생각한 것 안에 폴더로 또 생성되어 수정, 에러 코드 보고 test_page 관련 변수?를 main으로 수정
### 리액트 네이티브의 화면 및 연결 분석
- 기본적인 화면 연결 및 동작은 App.tsx 에서 이루어지는 것으로 보임
### 기능 구현 (Level 1)
> **예제 참고** [**Bottom Tabs Navigator**](https://reactnavigation.org/docs/bottom-tab-navigator/)


> **에러 발생**: Cant find ViewManager 'RNCSafeAreaProvider' ...

```sh
npm install react-native-safe-area-context
```

> **에러 발생**: Cant find ViewManager 'RNSScreenContentWrapper' ...

```sh
 npm install react-native-screens
 
 # 해결 X
 npm update all
```

라이브 빌드 중 컴포넌트 동적 할당쪽 문제가 있었는지 

```tsx
function App() {
  return (
    <View>
      <Text>Welcome to React Native!</Text>
    </View>
  )
```

같이 화면 재구성 후 돌려보니 잘 동작함

이후 추가로 UI 가 보이지 않던 문제는
NavigationContainer 컴포넌트를 사용하지 않아서 발생한 문제였음

### 기능 구현 (Level 2)
- 외부 캘린더 라이브러리가 무엇인지 먼저 확인해봄
- 기본 구현된 캘린더 라이브러리 유무를 확인해봄
    - 딱히 찾지 못함
    - 아마도 직접 하나하나 구현하는 형태를 원하는 것으로 보임
- 제시된 이미지와 최대한 유사하게 UI 구성
    - *오늘 날짜*가 뜻하는 바가 명확하지 않아, 캘린더의 구조 및 원으로 선택된 날짜를 모두 포함하는 의미로 간주, 처음 켜졌을 시 선택하는 형태로 구성
        - 오늘 날짜를 알 수도 있으며, 자동으로 선택되어 사용자의 편의성에 약간의 도움이 됨

클래스의 형태로 구현하려 해보니, 값의 변경에 따른 UI 업데이트가 되지 않음 
> Qt는 이런 형태로 짜도 내부 타이머로 주기적 참조 및 업데이트가 진행되는 형태였으나, 리액트 네이티브는 이벤트 형태로만 동작하는 것으로 추정됨

> **참고** [**UI 업데이트 에러**](https://stackoverflow.com/questions/70616008/ui-does-not-update-when-navigate-to-a-screen-in-different-stack)

- 초기
```tsx
export class calendar {
    private thisDate: Date;
    private selectedDate: Date;

    constructor(thisDate: Date = new Date(), selectedDate: Date = new Date()) {
        this.thisDate = thisDate;
        this.selectedDate = selectedDate;
    }

    public renderCalendar() {
        const thisDate = this.thisDate; //문제 발생
        const selectedDate = this.selectedDate; // 문제 발생

        ...
    }
```
- 수정
```tsx
export const Calendar = () => {
    const [thisDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderCalendar = () => {...}
```
다만 useState와 관련된 동작은 아직 온전히 이해하지 못함

그 외 실제 기능 구현 상의 어려운 점은 개발 언어 및 환경이 익숙하지 않다는 것외엔 없었음

### 기능 구현 (Level 3)
- 기존에 구현된 캘린더에서 주별, 월별 캘린더의 형태로 변환 및 이를 위한 이벤트 리스너를 연결하는 동작이 주가 될 것임
    - 특정 라이브러리를 사용하라 명시됨

> **예제 참고** [**React Native Reanimated**](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/your-first-animation)
> [**React Native Gesture Handler**](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)


> **에러 발생**: Failed to create worklet ...

> **참고** [**Reanimated worklet 에러**](https://kybeen.tistory.com/15)
```sh
# 해결 X
npm start -- --reset-cache

# 해결
npx react-native start --reset-cache
```
공식 문서에서는 위 해결책에 대한 내용이 없어 시간이 좀 걸림
아마도 기본 실행을 npx 로 하다 보니 cache 가 쌓이는 형태가 달랐던 것으로 추정됨

React Native Gesture Handler의 ReanimatedSwipeable 로 스와이프 및 월, 주 변경, 달력 넘김 등의 이벤트를 처리하려 했으나, 스와이프가 완전히 끝난 후 발생하는 이벤트가 없는 것으로 판단되어 다른 컴포넌트를 이용해보기로 함

PanGesture을 이용하여 어느정도의 동작은 유사하게 구현 가능했으나, 좌우 스와이프 시 
(좌 화면 캘린더 전부 표시) -> (좌표 롤백과 동시에 캘린더 이전 달로 표시)
같은 sequential 한 동작이 구현이 어려움 (공식 사이트의 예제만 보고서는)

비슷하게, 월 캘린더에서 주 캘린더로 접을 때 가려지는 동작을 구현해야 하나, 공식 사이트의 예제만으로는 구현이 어려움

## 개발 이후
- 문서 작성
    원래는 Copilot 을 이용하여 JSDoc을 작성하나, 아는 내용이 부족하기도 하고, Assistant Tool을 사용하지 않겠다 하여 넘어감
- Test Code 혹은 방법 기술
    기존 ES5 + Qt 를 이용하여 개발하던 때에는 제가 작성한 코드의 예외 상황을 코드 작성 시기부터 전부 고려할 수 있어, 시간적 여유와 추후 유지보수의 중요도를 정하여, 해당 시나리오를 문서화 후 내부 공유하는 형태로 적용하였으나, React Native 에 대한 이해가 부족하여, 각 단위 별 테스트 코드를 작성하여 테스트 해 보는 수준에서 끝날 것 같습니다.

위의 내용은 제가 혼자 개발한다면 진행하였을 프로세스이며, 당연히 회사의 내부 지침에 따를 것입니다.

**Enjoy!**