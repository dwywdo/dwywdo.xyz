---
title: 토비의 봄 TV 2회 - 수퍼 타입 토큰
description:
draft: true
tags:
  - annotation
aliases:
permalink:
date: 2025-10-10
---
[Source#0](https://gafter.blogspot.com/2006/12/super-type-tokens.html)
[Source#1](https://www.youtube.com/watch?v=01sdXvZSjcI)
[Source#2](https://www.youtube.com/watch?v=y_uGSqpE4So)
[Source#3](https://www.youtube.com/watch?v=WGwspdI0ilM)

[10:14](https://www.youtube.com/watch?v=01sdXvZSjcI&t=615#t=10:14.78) Super Type Token
- 기술적으로는 Type Token의 확장

[12:13](https://www.youtube.com/watch?v=01sdXvZSjcI&t=734#t=12:13.53) Type Token?
```java
public class TypeToken {
	static Object create() {
		return new Object();
	}
	
	public static void main(String[] args) {
		Object o = create();
		System.out.println(o.getClass());
	}
}
```
- 일종의 팩터리 메서드를 하나 만들어 보자 `create()`
- 만약 타입을 바꾸어가면서 생성하는 객체의 타입을 다양하게 가져가고 싶다? -> 보통 제네릭 메서드로 정의하게 된다.
```java
static <T> T create(Class<T> clazz) throws Exception {
	return clazz.newInstance();
}
```
- `Class`?: 클래스의 이름이 `Class`. 자바의 모든 클래스들의 `Class`를 대표하는 것에 대한 메타정보를 가지고 있다. 이미 제네릭으로 정의되어 있기 때문에 이 제네릭 메서드의 타입 파라미터와 일치시켜서 정의했다.
```java
String o = create(String.class);
Integer o = create(Integer.class);
```

> [!WARNING] Integer 클래스에는 기본 생성자 (A default constructor)가 없기 때문에 `new Integer();`도 불가능하다. 따라서 클래스의 기본 생성자를 사용하는 `newInstance()` 호출이 실패한다.

[17:15](https://www.youtube.com/watch?v=01sdXvZSjcI&t=1036#t=17:15.62) 타입 정보에 해당하는 부분을 동적으로 변경하여 사용할 수 있도록 만들어진 것이 제네릭

[17:29](https://www.youtube.com/watch?v=01sdXvZSjcI&t=1050#t=17:29.97) 제네릭 클래스로 다시 한번 살펴보자.

```java
public class TypeToken {
	public class Generic<T> {
		T value;
		void set(T t) {}
		T get() { return null; }
	}
}
```
- 클래스 레벨에서 타입 파라미터를 지정하고, (타입을 주고) 이 클래스 내에서 그 타입 변수를 받아 사용하면 실제로 사용되어 구체적인 타입이 정해질 때 모두 대체된다.

```java
Generic<String> s = new Generic<String>();
s.value = "String Value";
```
- 위 코드는 문제가 없다.
```java
Generic<Integer> i = new Generic<Integer>();
i.value = 1;
i.set(10);
```
- 위 코드도 문제가 없다.

[20:22](https://www.youtube.com/watch?v=01sdXvZSjcI&t=1222#t=20:22.43) 실제로 `value`의 타입은 컴파일하는 시점에서 보기에 결정될 수 있다. 하지만... 런타임 시에 `s` 객체의 타입을 읽어보면 String 타입이 아니다.
- Type Erasure 때문이다.
- 그 전에, T는 타입 파라미터라고 부르는데, 이를 이용해 제네릭으로 선언된 클래스들을 `Parameterized Type`이라고 이야기 한다. (e.g. `Generic<String>`)
	- 자바 컴파일러의 Type Erasure에 의해 여전히 런타임에는 Object 타입으로 인식된다.
	- 이게 어떻게 동작할 수 있는가? 컴파일러가 미리 확인한 다음에 실제 코드할 때에 캐스팅하는 코드를 넣어준다.

[22:22](https://www.youtube.com/watch?v=01sdXvZSjcI&t=1343#t=22:22.90) 중요한 것은...
- `create()` 메서드를 정의하고 사용할 때, 클래스 정보를 정확하게 넘기니까 캐스팅을 하지 않고 `clazz.newInstance();`와 같은 호출이 가능했다 -> **Type Safe하다! 캐스팅이 필요없다!**

```java
Object o = "String";
Integer i = (Integer)o;
System.out.println(i);
```
- 위 코드는 웃기게도 컴파일이 된다. 강제 캐스팅을 시키는게 String > Integer로 시도하게 된다
	- `ClassCastException`
	- 되게 위험한 코드이다.

[25:14](https://www.youtube.com/watch?v=01sdXvZSjcI&t=1514#t=25:14.23) Type 안정성이 있는 Map을 하나 만들어보자
- Map이라는 것은 안에 저장되어 있는 요소의 값이 어떤 타입이든지 다 들어갈 수 있다.
- 일정한 타입을 넣거나 빼도록하지 않으면, 가져올 때 캐스팅을 해서 가져와야만 할 것이다.
```java
static class TypesafeMap {
	Map<String, Object> map = new HashMap<>();
	void run() {
		map.put("a", "a");
		map.put("b", 1);
		Integer i = (Integer) map.get("b"); // 캐스팅 필수
		String i = (String) map.get("a"); // 캐스팅 필수
	}
}
```
- 위에서 이미 말했듯 위험한 코드이다.
	- 이런 식의 코드를 피하는 것이 타입 안전성을 지킬 수 있는 방법 중 하나이다.
	- 타입을 굳이 넣어준다는 것 자체가 안전하게 변수나 파라미터의 타입을 안전하게 컴파일러가 이해하고 넣어줄 수 있도록 만들기 위함.
	- 그 안전성을 보장받는 것을 포기하고 위와 같이 코드를 작성하는 것이 위험
- 하지만 이럴 필요가 있다고 가정을 하고, 어떻게 안전하게 더 작성할 수 있는가?

가정: 특정 타입의 맵 요소는 하나씩만 만든다. 즉 키를 Type으로 줄 것이다.
```java
Map<Class<?>, Object> map = new HashMap<>();
```
 위와 같이 작성하면 특정 타입을 키로 한 값을 하나씩만 넣을 수 있다!

```java
void put(Class<?> clazz, Object value) {
	map.put(clazz, value);
}
```
- 어떤 위험성이 여전히, 존재하냐?
	- 클래스 타입을 Put할 때 `String`으로 넘기는 것을 가정해보자
```java
TypesafeMap m = new TypesafeMap();
m.put(String.class, "Value"); // Class<String>
```
- `m.put(Integer.class, "Value");`도 동작한다는 점이 문제이다.

따라서 클래스의 타입과 Value의 타입을 일치시켜주자

```java
<T> void put(Class<T> clazz, T value) {
	m.put(clazz, value);
}
```

```java
m.put(Integer.class, 1);
m.put(String.class, "String");
m.put(List.class, Arrays.asList(1, 2, 3));
```

가져올 때도 마찬가지이다.

```java
<T> T get(Class<T> clazz) {
	return map.get(clazz);
}
```
- 위 코드는 타입 캐스트 에러가 난다

```java
<T> T get(Class<T> clazz) {
	return (T) map.get(clazz);
}
```
- Type Safe한 방법이 아니다.

```java
<T> T get(Class<T> clazz) {
	return clazz.cast(map.get(clazz));
}
```
- 타입캐스팅을 명시적으로 해주자.

```java
System.out.println(m.get(Integer.class));
System.out.println(m.get(String.class));
System.out.println(m.get(List.class));
```
- 강제로 캐스팅하는 것이 하나도 없기 때문에, 안정적인 코드가 된다.

[33:34](https://www.youtube.com/watch?v=01sdXvZSjcI&t=2015#t=33:34.52) 클래스 이름 뒤에 .class라고 붙이면 나오는, Global하게 하나의 객체로 선언되어 있는 `Class<Integer>` 등이 전달이 되어서 메서드의 타입체크 기능을 이용해 안전하게 집어넣고 빼는 기능을 만들 수 있다.

어떤 특정 타입의 클래스 정보를 넘겨서 타입 안전성을 꾀하는 기법을 `Type Token`이라고 부른다.
- 타입 정보를 가져다가 값으로 넘기겠다는 의미

[34:29](https://www.youtube.com/watch?v=01sdXvZSjcI&t=2069#t=34:29.17) 이 타입토큰을 자바 5가 나오고 Generic이 나오다보니... 한계가 있었다.
- 리스트 타입의 경우, `Integer List` / `String List`가 모두 `List` 타입이므로 우리의 현재 맵에서는 둘 다 각자 저장하고 싶어도 키가 같아서 덮어씌워지더라...

```java
m.put(List<Integer>.class, Arrays.asList(1,2,3));
```
- 컴파일러가 에러를 발생시킨다. `Class` 리터럴로 클래스 오브젝트를 가져올 때, 타입 파라미터가 적용된 것은 구분되어 가져올 수 없게 되어 있다.
- `Class`는 제네릭의 타입에 대한 정보를 가지고 있지 않다.
- 예전에는 List의 원소가 무조건 Object였는데, 타입 토큰을 응용해야 하는 경우에도 제네릭화된 타입 토큰은 쓸 수가 없었다 (e.g. `List<String>`은 사용이 불가능하더라)
- 여기서 나온 것이 `Super Type Token`



---
> [!QUOTE] Note
> 

> [!EXAMPLE] References
> - 
