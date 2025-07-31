---
title: System Design Interview Vol.1 - An insider's guide
description: 
draft: false
tags:
  - annotation
aliases: 
permalink: 
date: 2025-07-17
---
[Source](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF) 
# 8장 URL 단축기 설계
---
 
## 1단계 문제 이해 및 설계 범위 확정
---
**p.139** "어떻게 동작해야 하는지 예제...트래픽 규모...매일 1억(100million) 개의 단축 URL을 만들어 낼 수 있어야 합니다....단축 URL의 길이...짧으면 짧을수록 좋습니다....단축 URL에 포함될 문자에 제한이 있습니까?...숫자(0부터 9까지)와 영문자(a부터 z, A부터 Z까지)만...단축된 URL을 시스템에서 지우거나 갱신할 수 있습니까?...삭제나 갱신은 할 수 없다고 가정"


### 개략적 추정
---
![[image-140-x104-y253.png|300]]



> [!QUOTE] Estimation for Storage
> - This is pretty straightforward... Can we be sure?
> - Through this calculation, we could think that we can assume in some extent (If it's reasonable, of course)

 
## 2단계 개략적 설계안 제시 및 동의 구하기
---

### API 엔드포인트
---
**p.141** "URL 단축용 엔드포인트: 새 단축 URL을 생성하고자 하는 클라이언트는 이  엔드포인트에 단축할 URL을 인자로 실어서 POST 요청을 보내야 한다."

**p.141** "URL 리디렉션용 엔드포인트: 단축 URL에 대해서 HTTP 요청이 오면 원래  URL로 보내주기 위한 용도의 엔드포인트"


### URL 리디렉션
---
![[image-141-x97-y75.png|300]]



> [!QUOTE] Flow?
> 1. Client > Server: Visit shorten URL
> 2. Server > Client: Return 301 w/ Location: long URL
> 3. Client (Browser) > Server: Visit long URL

**p.142** "유의할 것은 301 응답과 302 응답의 차이"

**p.142** "301 Permanently Moved...브라우저는 이 응답을 캐시(cache)한다. 따라서  추후 같은 단축 URL에 요청을 보낼 필요가 있을 때 브라우저는 캐시된 원래  URL로 요청을 보내게 된다."

**p.142** "302 Found...&#39;일시적으로&#39; Location 헤더  가 지정하는 URL에 의해 처리되어야 한다는 응답이다....언제나 단축 URL 서버에 먼저 보내진 후에 원래 URL로 리디렉션  되어야 한다."

**p.143** "서버 부하를 줄이는 것이 중요하다면 301 Permanent Moved를 사용하는 것이 좋은데 첫 번째 요청만 단축 URL 서버로 전송될 것이기 때문이다. 하지만 트래픽 분석(analytics)이 중요할 때는 302 Found를 쓰는 쪽이 클릭 발생률이나 발생 위치를 추적하는 데 좀 더 유리할 것이다."



> [!QUOTE] Why `302 Found` is better for tracking traffics?
> Because with `301 Permanent Moved`, we can't differentiate the followings cases
> 1. Users clicks shorten URL > Redirected to long URL (After first access, all access to shorten URL actually goes to long URL due to browser caching)
> 2. Users clicks long URL

**p.143** "해시 테이블에 &lt;단축 URL, 원래 URL&gt;의 쌍을 저장한다고 가정한다면,  URL 리디렉션은 다음과 같이 구현"

![[image-143-x100-y520.png|300]]


### URL 단축
---
**p.143** "해시 함수는 다음 요구사항을 만족"

![[image-143-x109-y130.png|300]]

 
## 3단계 상세 설계
---

### 데이터 모델
---
**p.144** "&lt;단축 URL, 원래 URL&gt;의 순서쌍을  관계형 데이터베이스에 저장"

**p.144** "id"



> [!QUOTE] Actual Input Value for Hash Function

![[image-144-x216-y319.png|300]]



> [!QUOTE] Why can't I just use `shortURL` as PK?


### 해시 함수
---

### 해시 값 길이
---
**p.144** "hashValue의 길이를 정하기 위해서는  62&quot;&gt;3650억 (365billion)인 n의 최솟값을 찾아야 한다."



> [!QUOTE] For 10 years, 365 billion records can be stored. N = 7

**p.145** "해시 함수 구현에 쓰일 기술로는 두 가지 방법을 살펴보겠다. 하나는 &#39;해시  후 충돌 해소&#39; 방법이고, 다른 하나는 &#39;base-62 변환&#39; 법이다."


### 해시 후 충돌 해소
---
**p.145** "CRC32, MD5, SHA-1같이 잘 알려진 해시 함수를 이용...CRC32가 계산한 가장 짧은 해시값조차도  7보다는 길다."

**p.146** "첫 번째 방법은 계산된 해시 값에서 처음 7개 글자만 이용 하는 것이다. 하지만 이렇게 하면 해시 결과가 서로 충돌할 확률이 높아진다. 충돌이 실제로 발생했을 때는, 충돌이 해소될 때까지 사전에 정한 문자열을 해시값에 덧붙인다. 이 절차는 그림 8-5와 같다."

![[image-146-x96-y339.png|300]]

**p.146** "단축 URL을 생성할 때 한 번 이상 데이터베이스 질의를 해야 하므로 오버헤드가 크다. 데이터베이스 대신 블룸 필 터를 사용하면 성능을 높일 수 있다."


### base-62 변환
---
**p.147** "따라서 단축 URL은 `https://tinyurl.com/2TX`가 된다."



> [!QUOTE] But actual TinyURL service seems to always return shortURL as 8 characters. Why and how is like that?
> - AH! It's probably because the service has been running for a long time so I could think that very initial requests might have returned shorten URL less than 8 characters...!


### 두 접근법 비교
---
![[image-147-x103-y116.png|300]]


### URL 단축기 상세 설계
---
![[image-148-x107-y349.png|300]]

**p.148** "2. 데이터베이스에 해당 URL이 있는지 검사한다."



> [!QUOTE] Do we need to execute query for this? OR use Bloom Filter?

**p.149** "ID 생성기...의 주  된 용도는, 단축 URL을 만들 때 사용할 ID를 만드는 것이고, 이 ID는 전역적 유  일성(globally unique)이 보장되는 것이어야 한다."


### URL 리디렉션 상세 설계
---
![[image-149-x104-y78.png|300]]



> [!QUOTE] Cache is used to store the pair of (`shortUrl`, `originUrl`)


### 4단계 마무리
---
**p.150** "처리율 제한 장치(rate limiter): 지금까지 살펴본 시스템은 엄청난 양의 URL  단축 요청이 밀려들 경우 무력화될 수 있다는 잠재적 보안 결함을 갖고 있  다."

**p.150** "웹 서버의 규모 확장: 본 설계에 포함된 웹 계층은 무상태(stateless) 계층이  므로, 웹 서버를 자유로이 증설하거나 삭제할 수 있다."

**p.150** "데이터베이스의 규모 확장: 데이터베이스를 다중화하거나 샤딩(sharding)  하여 규모 확장성을 달성할 수 있다."

 
# 9장 웹 크롤러 설계
---
 
## 1단계 문제 이해 및 설계 범위 확정
---

