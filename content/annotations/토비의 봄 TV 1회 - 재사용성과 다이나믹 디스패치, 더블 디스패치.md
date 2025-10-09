---
title: 토비의 봄 TV 1회 - 재사용성과 다이나믹 디스패치, 더블 디스패치
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-10-09
---
[Source](https://www.youtube.com/watch?v=s-tXAHub6vg)

[04:37](https://www.youtube.com/watch?v=s-tXAHub6vg&t=277#t=04:37.06) Spring = Dependency + Injection + Framework

Dependency?
- Supplier의 변화가 Client에 영향을 주는 경우에 의존관계가 있다고 함

![[mx-img-dpt9bkesztznodjigdhg8m05-pt8m2_24s-41lk51.jpg]]

1. Supplier가 Client의 필드로서 사용되는 경우 
2. Supplier가 Client 메서드의 파라미터로 받는 경우
3. Supplier가 클라이언트의 로컬 변수로 사용되는 경우
4. Supplier로 메시지를 보내는 경우

[08:04](https://www.youtube.com/watch?v=s-tXAHub6vg&t=485#t=08:04.66) 이런 의존관계가 있는 경우 Client는 재사용하기 어렵다 > 컴포넌트 / 서비스가 되기 힘들다.
- Supplier가 변경되면 Client가...
	- 컴파일이 안될수도 있고
	- 기대와 다르게 동작할 수도 있고
	- 이상 없이 잘 동작할 수도 있다 (...)

![[mx-img-dpt9bkesztznodjigdhg8m05-pt9m21_93s-1vno44z.jpg]]

[10:03](https://www.youtube.com/watch?v=s-tXAHub6vg&t=603#t=10:03.24) GoF - Design Patterns
- 부제에 집중하자. **Elements of 'Reusable' Object-Oriented Software**
- 오브젝트 패턴은, 런타임시에 바뀔 수 있는 (상속 관계보다) 더 동적인 오브젝트 (의존) 관계를 다룬다.

![[mx-img-dpt9bkesztznodjigdhg8m05-pt11m39_82s-do51dp.jpg]]

- 주로 Object Scope에 속하는 패턴이 위의 동적인 오브젝트 의존 관계를 다룬다.
- Class Scope의 패턴은 주로 상속을 기반으로 하고, Object Scope의 패턴은 상속이 아니라 주로 Composition(합성, 인터페이스)을 기반으로 한다.
	- Runtime 시에 의존 관계가 바뀌게 된다.

[17:57](https://www.youtube.com/watch?v=s-tXAHub6vg&t=1077#t=17:57.47) Class Dependency vs. Programming to Interface (Class -> Interface)

![[mx-img-dpt9bkesztznodjigdhg8m05-pt18m40_01s-1luzrfk.jpg]]
- C를 **Framework**라 부른다.
	- 재사용이 가능한 구조로 작성이 되어서, 여러가지 케이스에 활용하도록 구조를 만들었기 때문에 작은 단위의 프레임워크라 부를 수 있다.

[19:57](https://www.youtube.com/watch?v=s-tXAHub6vg&t=1197#t=19:57.04) Dynamic (Method) Dispatch / Double Dispatch / Visitor Pattern / Visitor Proxy Pattern (in Hibernate)

[21:59](https://www.youtube.com/watch?v=s-tXAHub6vg&t=1320#t=21:59.95) Method Dispatch? 어떤 메서드를 내가 호출할 것인지 결정해서, 실제로 그것을 실행하는 과정을 의미. Static Dispatch / Dynamic Dispatch가 존재한다.

```java
public class Dispatch {
	static class Service {
		void run(int number) {
			System.out.println("run(" + number +  ")");
		}
		
		void run(string str) {
			System.out.println("run(" + str +  ")");
		}
	}
	
	public static void main(String[] args) {
		new Service().run(1);
		new Service().run("str");
	}
}
```

```bash
run(1)
run(str)
```

- `run()`이라는 메서드는 컴파일 시점에 이 메서드가 실행될 지를 컴파일러가 알고 있다. (Static Dispatch)
- 이름이 갖고 인자가 다른 오버로딩된 메서드의 경우에도 별도의 메서드로 취급되기에 Static Dispatch이다.
- Static Dispatch: 컴파일되는 시점에 정확하게 어떤 메서드가 호출될 지 정적으로 결정되는 것

[26:31](https://www.youtube.com/watch?v=s-tXAHub6vg&t=1592#t=26:31.53) Dynamic Dispatch

> Class를 Static으로 정의하는 이유는 지금 이 메모의 주제인 Static Dispatch와는 전혀 관계없는 이야기이다.
> - 클래스 안에 클래스를 완전히 독립적으로, 별개로 정의하려면 Static으로 만들어야 한다.

```java
public class Dispatch {
	static abstract class Service {
		abstract void run();
	}
	
	static class MyService1 extends Service {
		@Override
		void run() {
			System.out.println("run1");
		}
	}
	
	static class MyService2 extends Service {
		@Override
		void run() {
			System.out.println("run2");
		}
	}
	
	public static void main(String[] args) {
		MyService1 svc = new MyService();
		svc.run();
		
		MyService2 svc = new MyService();
		svc2.run();
	}
}
```

```bash
run1
run2
```

- 이것도 마찬가지로 Static Dispatch. 하지만 Service 타입으로 받게 되면...?

```java
Service svc = new MyService1();
svc.run();
```

- 이 경우에는 `svc.run();` 시점에서 같은 이름으로 정의되어 있는 두 개의 메서드 중 어떤 것을 실행할 것인지 컴파일 시점에 결정되어 있지 않다.
	- Runtime 시점에 `svc`에 할당되어 있는 객체가 무엇인지 확인하고 그것에 의해 결정되는 것!
	- 메서드 호출과정에 첫번째로 들어가있는 것 중에 하나가 `Receiver Parameter`
		- `this`에 해당하는 객체가 들어가 있다.
		- 이것에 기반하여 호출할 메서드가 결정된다.

```java
List<Service> svcs = Arrays.asList(new MyService1(), new MyService2());
svcs.forEach(service -> service.run()); // Receiver Parameter가 동적으로 결정되기 때문에 매 번 다르다.
// svcs.forEach(Service::run);
```

> [!TIP]
> - Method Type이 일치하면 메서드 레퍼런스 사용 가능
> ```java
> for (Service s: svcs) {
> 	s.run();
> }
> ```
> ```java
> svcs.forEach((Service s) -> { s.run(); });
> svcs.forEach((Service s) -> s.run());
> svcs.forEach(s -> s.run());
> svcs.forEach(Service::run);
> ```
> - Method Signature vs. Method Type
>   - Method Signature가 같은 메서드는 두 개 이상 정의할 수 없다.
>     - Method Name
>     - Parameter Types
>     - ~~Return Type은 포함되지 않는다.~~
>       - 즉 리턴타입이 다르면서 메서드 이름과 파라미터 갯수/타입만 같은 두 메서드를 정의할 수가 없다. (Generic은 일단 논외)
>   - Method Type은 이름이 없다. 메서드 타입이 일치하면 메서드 레퍼런스에 사용할 수 있다.
>     - Return Type
>     - Method Type Parameter
>     - Method Argument Types
>     - Exception
> - forEach는 Consumer라는 인터페이스 타입을 받는 메서드이다.
>   - Consumer와 람다식에서 사용하는 메서드 구조가 동일하기 때문에 메서드 레퍼런스로서 사용하는 것이 가능하다.


[44:10](https://www.youtube.com/watch?v=s-tXAHub6vg&t=2650#t=44:10.15) Double Dispatch

Dispatch를 두 번 한다? > Dynamic Dispatch를 두 번 한다.

```java
interface Post { void postOn(SNS sns); }

static class Text implements Post {
	public void postOn(SNS sns) {
		System.out.println("text -> " + sns.getClass().getSimpleName());
	}
}

static class Picture implements Post {
	public void postOn(SNS sns) {
		System.out.println("picture -> " + sns.getClass().getSimpleName());
	}
}

interface SNS { }

static class Facebook implements SNS { };

static class Twitter implements SNS { };
```

내가 가지고 있는 모든 Post 종류를 모든 SNS에 뿌리고 싶다!

```java
List<Post> posts = Arrays.asList(new Text();, new Picture());
List<SNS> sns = Arrays.asList(new Facebook(), new Twitter());

for (Post p: posts) {
	for (SNS s: sns) {
		p.postOn(s);
	}
}

posts.forEach(p -> sns.forEach(s->p.postOn(s)));
```

```bash
text -> Facebook
text -> Twitte 
picture -> Facebook
picture -> Twitter
```

postOn 메서드는 Text의 것인지, Picture의 것인지가 런타임에 호출할 때에 동적으로 결정된다 (Dynamic Dispatch)

지금은 로직이 단순하지만, 4가지 조합에 따라서 각각 비즈니스 로직을 다르게 구현해야 할 때가 있다...! 

그런 경우에 각각을 구분해서 구현하려면? 가장 쉽게 떠올리는 방법은 `instanceof`로 매 번 코드에서 타입을 체크하는 것

```java
static class Text implements Post {
	public void postOn(SNS sns) {
		if (sns instanceof Facebook) {
			// ... 
		}
		
		if (sns instanceof Twitter) {
			// ...
		}
	}
}

static class Picture implements Post {
	public void postOn(SNS sns) {
		if (sns instanceof Facebook) {
			// ... 
		}
		
		if (sns instanceof Twitter) {
			// ...
		}
	}
}
```

타입을 판별하기 위해 IF 문을 사용하고 있다? 문제가 발생할 수 있다.
- 예를 들어 Google이 추가되는 경우 실제 분기를 postOn()에 추가하지 않아도 코드 동작에 전혀 이상이 없다.
	- 이상이 없다는 점이 문제...!
- 새로운 타입이 추가될 때마다 IF 문을 추가해주어야 하고, 깜빡할 가능성이 높다.
- `instanceof`라는 것은 안티패턴으로도 많이 지적이 된다.

객체지향스럽게 접근하려면?

1. postOn에서 타입을 애초에 구분해서 인터페이스를 정의한다. -> **COMPILE ERROR**
```java
interface Post {
	void postOn(Facebook sns);
	void postOn(Twitter sns);
}

static class Text implements Post {
	public void postOn(Facebook sns) {
		// ...
	}
	public void postOn(Twitter sns) {
		// ... 
	}
}
```

```java
List<Post> posts = Arrays.asList(new Text();, new Picture());
List<SNS> sns = Arrays.asList(new Facebook(), new Twitter());

posts.forEach(p -> sns.forEach(s->p.postOn(s)));
// Cannot resolve method 'postOn(SNS)'
```

메서드 오버로딩은 Static Dispatch에 의한 것이기 때문에, 컴파일하는 시점에 파라미터의 타입을 정확히 체크해서 메서드를 정해놓아야 한다.
- 하지만 위 코드의 경우 파라미터가 Facebook / Twitter로 구체화되어있는데, 사실 자바가 보기에는 `SNS` 타입이어야만 한다. 반복문의 대상이 `List<SNS>`이므로...

[1:02:08](https://www.youtube.com/watch?v=s-tXAHub6vg&t=3729#t=1:02:08.73) 그럼 어떻게 풀어내야 할까? 이런 문제에 대해서 고민했던 논문이 `A Simple Technique for Handling Multiple Polymorphism`

이중 다형성의 적용이 필요하다. 폴리모피즘에 해당하는 타입을 런타임 시점에 결정하는 것을 Parameter를 가지고 하려고 했던 점이 문제이다.

자바는 Dynamic Dispatch을 파라미터를 기준으로 하지 않는다.

**두 가지 종류의 타입들의 조합에 해당하는 비즈니스 로직을 두 번째 타입을 결정해야 하는 SNS 쪽으로 옮겨놓아보자.**

```java
interface Post { void postOn(SNS sns); }

static class Text implements Post {
	public void postOn(SNS sns) {
		sns.post(this);
	}
}

static class Picture implements Post {
	public void postOn(SNS sns) {
		sns.post(this);
	}
}

interface SNS {
	void post(Text post);
	void post(Picture post);
}

static class Facebook implements SNS {
	public void post(Text post) { System.out.println("text-facebook"); }
	public void post(Picture post) { System.out.println("picture-facebook"); }
};

static class Twitter implements SNS {
	public void post(Text post) { System.out.println("text-twitter"); }
	public void post(Picture post) { System.out.println("picture-twitter"); }
};
```

두번째 폴리모피즘을 적용할 SNS 쪽에 옮겨놓고, Post 쪽에서는 전달받은 `sns.post()` 를 호출하면서 `this`, 즉 Post의 객체정보를 전달한다.

이것이 Double Dispatch인데, instanceof를 사용하는 것에 비해 얼마나 대단한 의미가 있나?

1. Google이 추가되는 경우, SNS을 구현하는 Google 클래스를 정의하더라도 Post 관련 클래스에는 전혀 손을 댄 것이 없다.
	- Post 타입은 SNS 타입에 의존하고 있는데, SNS 타입의 일부가 변경(새 타입 추가)되었지만 영향받지 않았다.
	- 이전에는 IF 문을 수정해야 했거나, 로직이 누락되는 버그가 발생할 가능성이 존재했다.

무슨 차이지? Dynamic Dispatch하는 조건을 Parameter로 걸었기에...!

`posts.forEach(p -> sns.forEach(s->p.postOn(s)));` > s.postOn(s)의 **s: SNS**
 
- `p.postOn(s)`에서 `s`에 대해서도 두번째로 Dynamic Dispatching이 되길 원했지만, 파라미터는 Dynamic Dispatch의 조건이 되지 않는다.
- 자바는 보통 Single Dispatch 언어라 부른다 (Receiver가 하나 뿐)
	- 어떤 메서드를 고를까를 결정하는 데 사용할 조건이 단일 Receiver Parameter 하나 뿐이다.
	- Parameter는 컴파일 시점에 결정이 되어 있지 않으면 진행이 될 수 없다. (컴파일 에러)
- 그래서 Parameter로 넘어온 것을 가져다가 메서드 호출의 Receiver로 만들어버린 것
	- `sns.post(this);`
	- `this`는 구체화된 타입의 객체이다. 컴파일 에러가 발생할 일이 없다.

[1:11:18](https://www.youtube.com/watch?v=s-tXAHub6vg&t=4278#t=1:11:18.18) 자주 필요하지는 않을 것이다 ㅎ 보통은 다형성을 1차원적으로 적용하면 대부분 커버가 된다. 

두 가지 이상의 Object Hierachy의 타입들을 조합을 해서 2차원적으로 비즈니스 로직 구조가 만들어지는 경우 필요한 기법

아예 Multi Methods를 지원하는 언어들이 있다 > (Multi Dispatching이 가능)
- CommonLisp
- Julia

그렇지만 대부분의 주류 언어들은 이를 지원하지 않는다.

[1:17:01](https://www.youtube.com/watch?v=s-tXAHub6vg&t=4622#t=1:17:01.98) 각각 다른 경우를 커버하지 않도록 작성하는 경우도 있다. 예를 들어 Text는 항상 동일한 로직, Picture에 대해서만 다르게 구현해야 한다고 하면 Superclass에 로직을 작성 후 필요한 경우에만 오버라이딩하도록...!

[1:17:33](https://www.youtube.com/watch?v=s-tXAHub6vg&t=4653#t=1:17:33.02) GoF에서는 Visitor 패턴이라는 이름으로 소개가 되었다. 여기에 적용된 원리가 Double Dispatch

Visitor가 각 구조를 순회하면서 그 때마다 `visitor.visit(this)`와 같이 호출하고, 나는 방문했으니 너가 알아서 로직을 구현해라라는 식
- Object 구조 쪽의 코드를 손대지 않고 새로운 연산(작업)을 추가할 수 있다는 것이 장점이다.
- 나름의 OCP에 기반한 접근법 :)

단점? 요소가 새롭게 추가되면 (연산이 아니라) Visitor에 해당하는 부분에 메서드를 추가해야 하고, 그 부분을 모든 Visitor에서 추가해주어야 한다
- 추상클래스나 인터페이스로 구현하면 빼먹을 일을 줄일 수 있다.

[1:19:57](https://www.youtube.com/watch?v=s-tXAHub6vg&t=4798#t=1:19:57.77) 마무리

[1:21:24](https://www.youtube.com/watch?v=s-tXAHub6vg&t=4884#t=1:21:24.01) 만약 Polymorphic Query 같은 것을 JPA를 통해 사용한다고 생각해보자.

```java
List<SNS> sns = repository.findXXX();
```

Polymorphic Query로 가져온 경우 모두 Proxy 형태로 가져오기 때문에 이걸 기반으로 instanceof로 타입을 확인하면 그냥 SNS 타입으로 나온다.

즉 구체타입을 알 수 없어서 반드시 Visitor 패턴을 사용해서 요소의 내부까지 들어간 후, 호출이 일어나는 순간에 타입을 알아내야 한다.

이 때 Visitor 패턴을 사용하는 것을 **Proxy Visitor Pattern**이라 부른다.

[1:26:23](https://www.youtube.com/watch?v=s-tXAHub6vg&t=5184#t=1:26:23.54) JDK Internal에서도 ASM의 AnnotationVisitor를 사용한다.

---
> [!QUOTE] Note
> 

> [!EXAMPLE] References
> - [Designing Reusable Classes](https://www.cse.msu.edu/~cse870/Input/SS2002/MiniProject/Sources/DRC.pdf)
> - [A Simple Technique for Handling Multiple Polymorphism](https://algoritmos-iii.github.io/assets/bibliografia/simple-technique-for-handling-multiple-polymorphism.pdf)
