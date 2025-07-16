---
tags:
  - annotation
---
[Source](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF) 
#### 1장 사용자 수에 따른 규모 확장성
---
 
#### 8장 URL 단축기 설계
---
 
##### 1단계 문제 이해 및 설계 범위 확정
---
**p.139** "어떻게 동작해야 하는지 예제...트래픽 규모...매일 1억(100million) 개의 단축 URL을 만들어 낼 수 있어야 합니다....단축 URL의 길이...짧으면 짧을수록 좋습니다....단축 URL에 포함될 문자에 제한이 있습니까?...숫자(0부터 9까지)와 영문자(a부터 z, A부터 Z까지)만...단축된 URL을 시스템에서 지우거나 갱신할 수 있습니까?...삭제나 갱신은 할 수 없다고 가정"


###### 개략적 추정
---
![[fleetings/attachments/SystemDesignInterview/image-140-x104-y253.png|300]]



> [!COMMENT]- Estimation for Storage
> - This is pretty straightforward... Can we be sure?
> - Through this calculation, we could think that we can assume in some extent (If it's reasonable, of course)

 
##### 2단계 개략적 설계안 제시 및 동의 구하기
---

###### API 엔드포인트
---
**p.141** "URL 단축용 엔드포인트: 새 단축 URL을 생성하고자 하는 클라이언트는 이  엔드포인트에 단축할 URL을 인자로 실어서 POST 요청을 보내야 한다."

**p.141** "URL 리디렉션용 엔드포인트: 단축 URL에 대해서 HTTP 요청이 오면 원래  URL로 보내주기 위한 용도의 엔드포인트"


###### URL 리디렉션
---
![[fleetings/attachments/SystemDesignInterview/image-141-x97-y75.png|300]]



> [!COMMENT]- Flow?
> 1. Client > Server: Visit shorten URL
> 2. Server > Client: Return 301 w/ Location: long URL
> 3. Client (Browser) > Server: Visit long URL

**p.142** "유의할 것은 301 응답과 302 응답의 차이"

**p.142** "301 Permanently Moved...브라우저는 이 응답을 캐시(cache)한다. 따라서  추후 같은 단축 URL에 요청을 보낼 필요가 있을 때 브라우저는 캐시된 원래  URL로 요청을 보내게 된다."

**p.142** "302 Found...&#39;일시적으로&#39; Location 헤더  가 지정하는 URL에 의해 처리되어야 한다는 응답이다....언제나 단축 URL 서버에 먼저 보내진 후에 원래 URL로 리디렉션  되어야 한다."

**p.143** "서버 부하를 줄이는 것이 중요하다면 301 Permanent Moved를 사용하는 것이 좋은데 첫 번째 요청만 단축 URL 서버로 전송될 것이기 때문이다. 하지만 트래픽 분석(analytics)이 중요할 때는 302 Found를 쓰는 쪽이 클릭 발생률이나 발생 위치를 추적하는 데 좀 더 유리할 것이다."



> [!COMMENT]- Why `302 Found` is better for tracking traffics?
> Because with `301 Permanent Moved`, we can't differentiate the followings cases
> 1. Users clicks shorten URL > Redirected to long URL (After first access, all access to shorten URL actually goes to long URL due to browser caching)
> 2. Users clicks long URL


