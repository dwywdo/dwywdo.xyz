---
title: Effective Java
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-12-21
---
[Source](https://product.kyobobook.co.kr/detail/S000001033066) 
# 3장 모든 객체의 공통 메서드
---

<font color="#5EA33E"><strong>p.68</strong> "Object에서 final이 아닌 메서드(equals, hashCode, toString,  clone, finalize)는 모두 재정의(overriding)를 염두에 두고 설계된 것이라 재  정의 시 지켜야 하는 일반 규약이 명확히 정의되어 있다."</font>


<font color="#EF7DFA"><strong>p.68</strong> "메서드를 잘못 구현하면 대상 클래스가 이 규약을 준수한다고 가정  하는 클래스(HashMap과 HashSet 등)를 오동작하게 만들 수 있다."</font>

 
## 아이템 10 equals는 일반 규약을 지켜 재정의하라
---

<font color="#5EA33E"><strong>p.69</strong> "다음에서 열거한 상황 중 하나에 해당한다면 재정의하지 않  는 것이 최선"</font>


**p.69** "각 인스턴스가 본질적으로 고유하다. 값을 표현하는 게 아니라 동작하는  개체를 표현하는 클래스가 여기 해당한다."


**p.69** "인스턴스의 ‘논리적 동치성(logical equality)&#39;을 검사할 일이 없다."


**p.69** "상위 클래스에서 재정의한 equals가 하위 클래스에도 딱 들어맞는다."


**p.69** "클래스가 private이거나 package-private이고 equals 메서드를 호출할 일이  없다. 여러분이 위험을 철저히 회피하는 스타일이라 equals가 실수로라도  호출되는 막고 싶다 다음처럼 구현해두자."

![[annotations/attachments/blochEffectiveJava2018/image-70-x97-y718.png|300]]


<font color="#5EA33E"><strong>p.70</strong> "equals를 재정의해야 할 때는 언제일까?"</font>


**p.70** "객체 식별성(object identity;  두 객체가 물리적으로 같은가)이 아니라 논리적 동치성을 확인해야 하는데, 상  위 클래스의 equals가 논리적 동치성을 비교하도록 재정의되지 않았을 때"


<font color="#5EA33E"><strong>p.70</strong> "주로 값 클래스들이 여기 해당한다."</font>


<font color="#5EA33E"><strong>p.70</strong> "equals가 논리적 동  치성을 확인하도록 재정의해두면, 그 인스턴스는 값을 비교하길 원하는 프로  그래머의 기대에 부응함은 물론 Map의 키와 Set의 원소로 사용할 수 있게 된다."</font>


<font color="#EF7DFA"><strong>p.70</strong> "값이 같은 인스턴스가 둘 이상 만들어지지 않음을 보장  하는 인스턴스 통제 클래스(아이템 1)라면 equals를 재정의하지 않아도 된다.  Enum(아이템 34)도 여기에 해당한다."</font>


<font color="#5EA33E"><strong>p.70</strong> "equals 메서드를 재정의할 때는 반드시 일반 규약을 따라야 한다. 다음은  Object 명세에 적힌 규약"</font>



> [!QUOTE] 기본적으로는 동치관계를 구현한다는 원칙을 따른다고 볼 수 있다.


**p.70** "반사성(reflexivity): null이 아닌 모든 참조 값 x에 대해, x.equals(x)는 true다."


**p.70** "대칭성(symmetry): null이 아닌 모든 참조 값 x, y에 대해, x.equals(y) true  y.equals(x)도 true다."


**p.70** "추이성(transitivity): null이 아닌 모든 참조 값 x, y, z에 대해, x.equals(y)가 true이  고 y.equals(z)도 true면 x.equals(2) true다."


**p.70** "일관성(consistency): null이 아닌 모든 참조 값 x, y에 대해, x.equals(y)를 반복해서  호출하면 항상 true를 반환하거나 항상 false를 반환한다."


**p.70** "null-아님: null이 아닌 모든 참조 값 x에 대해, x.equals(null)은 false다."


<font color="#5EA33E"><strong>p.71</strong> "Object 명세에서 말하는 동치관계란 무엇일까?"</font>


**p.71** "쉽게 말해, 집합을  서로 같은 원소들로 이뤄진 부분집합으로 나누는 연산이다."


<font color="#49BEFC"><strong>p.71</strong> "반사성은 단순히 말하면 객체는 자기 자신과 같아야 한다는 뜻이다....이  요건을 어긴 클래스의 인스턴스를 컬렉션에 넣은 다음 contains 메서드를 호출  하면 방금 넣은 인스턴스가 없다고 답할 것이다."</font>


<font color="#49BEFC"><strong>p.71</strong> "대칭성은 두 객체는 서로에 대한 동치 여부에 똑같이 답해야 한다는 뜻"</font>


**p.71** "대소문자를  구별하지 않는 문자열을 구현한 다음 클래스를 예로 살펴보자. 이 클래스에서  toString 메서드는 원본 문자열의 대소문자를 그대로 돌려주지만 equals에서  는 대소문자를 무시한다."


**p.72** "CaseInsensitivestring과 일반 String 객체가 하나씩 있다고 해  보자."

![[annotations/attachments/blochEffectiveJava2018/image-72-x101-y491.png|300]]


<font color="#EF7DFA"><strong>p.72</strong> "문제는 CaseInsensitive  String equals String String equals Case  InsensitiveString의 존재를 모른다는 데 있다. 따라서 s.equals(cis)는 false  를 반환하여, 대칭성을 명백히 위반한다."</font>

![[annotations/attachments/blochEffectiveJava2018/image-72-x104-y318.png|300]]


**p.72** "이 다음에 list.contains(s)를 호출하면 어떤 결과가 나올까? 현재의 OpenJDK  에서는 false를 반환하기는 한다. 하지만 이는 순전히 구현하기 나름이라  OpenJDK 버전이 바뀌거나 다른 JDK에서는 true를 반환하거나 런타임 예외를  던질 수도 있다."


<font color="#EF7DFA"><strong>p.72</strong> "이 문제를 해결하려면 CaseInsensitivestring의 equals String과도 연동  하겠다는 허황한 꿈을 버려야 한다."</font>


<font color="#49BEFC"><strong>p.73</strong> "추이성은 첫 번째 객체와 두 번째 객체가 같고, 두 번째 객체와 세 번째 객체가  같다면, 첫 번째 객체와 세 번째 객체도 같아야 한다는 뜻이다."</font>


**p.73** "상위 클래스에는 없는 새로운 필드를 하위 클래  스에 추가하는 상황을 생각해보자. equals 비교에 영향을 주는 정보를 추가한  것이다."


<font color="#EF7DFA"><strong>p.75</strong> "구체 클래스를 확장해 새로운 값을 추가하면서  equals 규약을 만족시킬 방법은 존재하지 않는다."</font>


**p.75** "이 말은 얼핏, equals 안의 instanceof 검사를 getClass 검사로 바꾸면 규약  도 지키고 값도 추가하면서 구체 클래스를 상속할 수 있다는 뜻으로 들린다."


<font color="#5EA33E"><strong>p.76</strong> "구체 클래스의 하위 클래스에서 값을 추가할 방법은 없지만 괜찮은 우회 방  법이 하나 있다. &quot;상속 대신 컴포지션을 사용하라&quot;는 아이템 18의 조언을 따  르면 된다."</font>


**p.77** "자바 라이브러리에도 구체 클래스를 확장해 값을 추가한 클래스가 종종 있다.  한 가지 예로 java.sql.Timestamp는 java.util.Date를 확장한 후 nanoseconds  필드를 추가했다."


<font color="#EF7DFA"><strong>p.77</strong> "그 결과로 Timestamp의 equals는 대칭성을 위배하며, Date  객체와 한 컬렉션에 넣거나 서로 섞어 사용하면 엉뚱하게 동작할 수 있다."</font>


<font color="#5EA33E"><strong>p.77</strong> "추상 클래스의 하위 클래스에서라면 equals 규약을 지키면서도 값을 추가할 수 있다.  “태그 달린 클래스보다는 클래스 계층구조를 활용하라&quot;는 아이템 23의 조언을 따르는 클  래스 계층구조에서는 아주 중요한 사실이다."</font>


**p.78** "상위 클래스를 직접 인스턴스  로 만드는 게 불가능하다면 지금까지 이야기한 문제들은 일어나지 않는다."


<font color="#49BEFC"><strong>p.78</strong> "일관성은 두 객체가 같다면 (어느 하나 혹은 두 객체 모두가 수정되지 않는 한  앞으로도 영원히 같아야 한다는 뜻이다."</font>


<font color="#5EA33E"><strong>p.78</strong> "클래스가 불변이든 가변이든 equals의 판단에 신뢰할 수 없는 자원이 끼어  들게 해서는 안 된다."</font>


<font color="#EF7DFA"><strong>p.78</strong> "java.net.URL의 equals는 주어진 URL과 매핑된 호스트의 IP 주소  를 이용해 비교한다. 호스트 이름을 IP 주소로 바꾸려면 네트워크를 통해야 하  는데, 그 결과가 항상 같다고 보장할 수 없다. 이는 URL의 equals가 일반 규약을  어기게 하고, 실무에서도 종종 문제를 일으킨다. URL의 equals를 이렇게 구현한  것은 커다란 실수였으니 절대 따라 해서는 안 된다."</font>


<font color="#5EA33E"><strong>p.78</strong> "equals는 항시 메모  리에 존재하는 객체만을 사용한 결정적(deterministic) 계산만 수행해야 한다."</font>


<font color="#49BEFC"><strong>p.78</strong> "마지막 요건은 공식 이름이 없으니 임의로 &#39;null-아님&#39;이라 부르겠다. null-아  님은 이름처럼 모든 객체가 null과 같지 않아야 한다는 뜻이다."</font>


**p.78** "실수로  NullPointerException을 던지는 코드는 흔할 것이다. 이 일반 규약은 이런 경  우도 허용하지 않는다. 수많은 클래스가 다음 코드처럼 입력이 null인지를 확  인해 자신을 보호한다."

![[annotations/attachments/blochEffectiveJava2018/image-78-x101-y67.png|300]]

![[annotations/attachments/blochEffectiveJava2018/image-79-x110-y584.png|300]]


**p.79** "instanceof는  (두 번째 피연산자와 무관하게 첫 번째 피연산자가 null이면 false를 반환한  다.(JLS, 15.20.2) 따라서 입력이 null이면 타입 확인 단계에서 false를 반환하  기 때문에 null 검사를 명시적으로 하지 않아도 된다."


<font color="#5EA33E"><strong>p.79</strong> "지금까지의 내용을 종합해서 양질의 equals 메서드 구현 방법을 단계별로 정  리해보겠다."</font>


<font color="#49BEFC"><strong>p.79</strong> "1. == 연산자를 사용해 입력이 자기 자신의 참조인지 확인한다."</font>


<font color="#49BEFC"><strong>p.79</strong> "2. instanceof 연산자로 입력이 올바른 타입인지 확인한다."</font>


**p.79** "어떤 인터페이스는 자신을 구현한 서로 다른 클래스끼리도 비교할 수 있  도록 equals 규약을 수정하기도 한다. 이런 인터페이스를 구현한 클래스  라면 equals에서 (클래스가 아닌) 해당 인터페이스를 사용해야 한다. Set,  List, Map, Map.Entry 등의 컬렉션 인터페이스들이 여기 해당한다."


<font color="#49BEFC"><strong>p.79</strong> "3. 입력을 올바른 타입으로 형변환한다. 앞서 2번에서 instanceof 검사를 했  기 때문에 이 단계는 100% 성공한다."</font>


<font color="#49BEFC"><strong>p.79</strong> "4. 입력 객체와 자기 자신의 대응되는 &#39;핵심&#39; 필드들이 모두 일치하는지 하나씩 검사한다."</font>


**p.80** "2단계에서 인터페이스를 사용했다면 입력의 필드 값을 가져올 때도  그 인터페이스의 메서드를 사용해야 한다. 타입이 클래스라면 접근 권한  에 따라) 해당 필드에 직접 접근할 수도 있다."


<font color="#EF7DFA"><strong>p.80</strong> "Float.equals와 Double.equals 메서드를 대신 사용할 수  도 있지만, 이 메서드들은 오토박싱을 수반할 수 있으니 성능상 좋지 않다."</font>


<font color="#EF7DFA"><strong>p.80</strong> "때론 null도 정상 값으로 취급하는 참조 타입 필드도 있다. 이런 필드는 정적  메서드인 Objects.equals(Object, Object)로 비교해 NullPointerException 발  생을 예방하자."</font>


<font color="#EF7DFA"><strong>p.80</strong> "어떤 필드를 먼저 비교하느냐가 equals의 성능을 좌우하기도 한다. 최상의  성능을 바란다면 다를 가능성이 더 크거나 비교하는 비용이 싼 (혹은 둘 다 해  당하는 필드를 먼저 비교하자."</font>

![[annotations/attachments/blochEffectiveJava2018/image-81-x99-y133.png|300]]


<font color="#5EA33E"><strong>p.82</strong> "equals를 재정의할 땐 hashCode도 반드시 재정의하자(아이템 11)."</font>


<font color="#5EA33E"><strong>p.82</strong> "너무 복잡하게 해결하려 들지 말자. 필드들의 동치성만 검사해도 equals 규  약을 어렵지 않게 지킬 수 있다."</font>


<font color="#5EA33E"><strong>p.82</strong> "Object 외의 타입을 매개변수로 받는 equals 메서드는 선언하지 말자."</font>


**p.82** "기본 equals를 그  대로 둔 채로 추가한 것일지라도, 이처럼 &#39;타입을 구체적으로 명시한&#39; equals  는 오히려 해가 된다."


<font color="#5EA33E"><strong>p.82</strong> "equals(hashCode도 마찬가지)를 작성하고 테스트하는 일은 지루하고 이를 테  스트하는 코드도 항상 뻔하다. 다행히 이 작업을 대신해줄 오픈소스가 있으니,  그 친구는 바로 구글이 만든 AutoValue 프레임워크다."</font>

 
## 아이템 11 equals를 재정의하려거든 hashCode도 재정의하라
---

<font color="#5EA33E"><strong>p.84</strong> "equals를 재정의한 클래스 모두에서 hashCode도 재정의해야 한다."</font>

![[annotations/attachments/blochEffectiveJava2018/image-84-x100-y338.png|300]]


<font color="#EF7DFA"><strong>p.84</strong> "hashCode 재정의를 잘못했을 때 크게 문제가 되는 조항은 두 번째다. 즉, 논리  적으로 같은 객체는 같은 해시코드를 반환해야 한다."</font>


**p.84** "아이템 10의 PhoneNumber 클래스의 인스턴스를 HashMap의 원소로  사용한다고 해보자."

![[annotations/attachments/blochEffectiveJava2018/image-84-x103-y108.png|300]]


**p.85** "2개의 PhoneNumber 인스턴스가 사용되었다. 하나는 HashMap에 &quot;제니를 넣을 때 사용됐고, 논리적  동치인) 두 번째는 이를 꺼내려할 때 사용됐다."


<font color="#EF7DFA"><strong>p.85</strong> "hashCode  를 재정의하지 않았기 때문에 논리적 동치인 두 객체가 서로 다른 해시코드를  반환하여 두 번째 규약을 지키지 못한다. 그 결과 get 메서드는 엉뚱한 해시 버  킷에 가서 객체를 찾으려 한 것"</font>


<font color="#EF7DFA"><strong>p.85</strong> "설사 두 인스턴스를 같은 버킷에 담았더  라도 get 메서드는 여전히 null을 반환하는데, HashMap은 해시코드가 다른 엔  트리끼리는 동치성 비교를 시도조차 하지 않도록 최적화되어 있기 때문"</font>


**p.85** "올바른 hashCode 메서드는 어떤 모습이어야 할까?"

![[annotations/attachments/blochEffectiveJava2018/image-85-x111-y418.png|300]]


<font color="#EF7DFA"><strong>p.85</strong> "끔찍하게도 모든 객체에게 똑같은 값만 내어주므로 모든 객체가 해시테이  블의 버킷 하나에 담겨 마치 연결 리스트(linked list)처럼 동작한다."</font>


**p.85** "그 결과 평  균 수행 시간이 (1)인 해시테이블이 O(n)으로 느려져서, 객체가 많아지면 도  저히 쓸 수 없게 된다."


<font color="#5EA33E"><strong>p.85</strong> "좋은 해시 함수라면 서로 다른 인스턴스에 다른 해시코드를 반환한다. 이것  이 바로 hashCode의 세 번째 규약이 요구하는 속성"</font>


<font color="#5EA33E"><strong>p.85</strong> "이상적인 해시 함수는  주어진 서로 다른 인스턴스들을 32비트 정수 범위에 균일하게 분배해야 한  다."</font>


<font color="#5EA33E"><strong>p.86</strong> "파생 필드는 해시코드 계산에서 제외해도 된다. 즉, 다른 필드로부터 계산해  낼 수 있는 필드는 모두 무시해도 된다."</font>


<font color="#5EA33E"><strong>p.86</strong> "또한 equals 비교에 사용되지 않은 필  드는 &#39;반드시 제외해야 한다."</font>


<font color="#5EA33E"><strong>p.87</strong> "곱할 숫자를 31로 정한 이유는 31이 홀수이면서 소수(prime)이기 때문이  다."</font>


<font color="#5EA33E"><strong>p.87</strong> "결과적으로 31을 이용하면, 이 곱셈  을 시프트 연산과 뺄셈으로 대체해 최적화할 수 있다(31 * i는 (i &lt; 5) - i  와 같다). 요즘 VM들은 이런 최적화를 자동으로 해준다."</font>


<font color="#5EA33E"><strong>p.87</strong> "단, 해시 충돌이 더욱  적은 방법을 꼭 써야 한다면 구아바의 com.google.common.hash. Hashing을 참고"</font>


<font color="#5EA33E"><strong>p.88</strong> "Objects 클래스는 임의의 개수만큼 객체를 받아 해시코드를 계산해주는 정  적 메서드인 hash를 제공한다."</font>


**p.88** "이 메서드를 활용하면 앞서의 요령대로 구현한  코드와 비슷한 수준의 hashCode 함수를 단 한 줄로 작성할 수 있다. 하지만 아  쉽게도 속도는 더 느리다."



> [!QUOTE] 입력 인수를 담기 위한 배열이 만들어지고, 입력 중 기본 타입이 있다면 박싱과 언박싱도 거쳐야 하기 때문이다.


<font color="#EF7DFA"><strong>p.88</strong> "그러니 hash 메서  드는 성능에 민감하지 않은 상황에서만 사용하자."</font>


<font color="#5EA33E"><strong>p.88</strong> "클래스가 불변이고 해시코드를 계산하는 비용이 크다면, 매번 새로 계산하기  보다는 캐싱하는 방식을 고려"</font>


**p.88** "해시  의 키로 사용되지 않는 경우라면 hashCode가 처음 불릴 때 계산하는 지연 초  기화(lazy initialization) 전략은 어떨까? 필드를 지연 초기화하려면 그 클래스  를 스레드 안전하게 만들도록 신경 써야 한다(아이템 83)."


<font color="#EF7DFA"><strong>p.89</strong> "성능을 높인답시고 해시코드를 계산할 때 핵심 필드를 생략해서는 안 된다."</font>


<font color="#5EA33E"><strong>p.89</strong> "hashCode가 반환하는 값의 생성 규칙을 API 사용자에게 자세히 공표하지 말  자. 그래야 클라이언트가 이 값에 의지하지 않게 되고, 추후에 계산 방식을 바  꿀 수도 있다."</font>


