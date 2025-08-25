---
title: System Design Interview Vol.1 - An insider's guide
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-08-25
---
[Source](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF) 
# 8장 URL 단축기 설계
---
 
## 1단계 문제 이해 및 설계 범위 확정
---
**p.139** "어떻게 동작해야 하는지 예제...트래픽 규모...매일 1억(100million) 개의 단축 URL을 만들어 낼 수 있어야 합니다....단축 URL의 길이...짧으면 짧을수록 좋습니다....단축 URL에 포함될 문자에 제한이 있습니까?...숫자(0부터 9까지)와 영문자(a부터 z, A부터 Z까지)만...단축된 URL을 시스템에서 지우거나 갱신할 수 있습니까?...삭제나 갱신은 할 수 없다고 가정"


### 개략적 추정
---
![[annotations/attachments/SystemDesignInterview/image-140-x104-y253.png|300]]



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
![[annotations/attachments/SystemDesignInterview/image-141-x97-y75.png|300]]



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

![[annotations/attachments/SystemDesignInterview/image-143-x100-y520.png|300]]


### URL 단축
---
**p.143** "해시 함수는 다음 요구사항을 만족"

![[annotations/attachments/SystemDesignInterview/image-143-x109-y130.png|300]]

 
## 3단계 상세 설계
---

### 데이터 모델
---
**p.144** "&lt;단축 URL, 원래 URL&gt;의 순서쌍을  관계형 데이터베이스에 저장"

**p.144** "id"



> [!QUOTE] Actual Input Value for Hash Function

![[annotations/attachments/SystemDesignInterview/image-144-x216-y319.png|300]]



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

![[annotations/attachments/SystemDesignInterview/image-146-x96-y339.png|300]]

**p.146** "단축 URL을 생성할 때 한 번 이상 데이터베이스 질의를 해야 하므로 오버헤드가 크다. 데이터베이스 대신 블룸 필 터를 사용하면 성능을 높일 수 있다."


### base-62 변환
---
**p.147** "따라서 단축 URL은 `https://tinyurl.com/2TX`가 된다."



> [!QUOTE] But actual TinyURL service seems to always return shortURL as 8 characters. Why and how is like that?
> - AH! It's probably because the service has been running for a long time so I could think that very initial requests might have returned shorten URL less than 8 characters...!


### 두 접근법 비교
---
![[annotations/attachments/SystemDesignInterview/image-147-x103-y116.png|300]]


### URL 단축기 상세 설계
---
![[annotations/attachments/SystemDesignInterview/image-148-x107-y349.png|300]]

**p.148** "2. 데이터베이스에 해당 URL이 있는지 검사한다."



> [!QUOTE] Do we need to execute query for this? OR use Bloom Filter?

**p.149** "ID 생성기...의 주  된 용도는, 단축 URL을 만들 때 사용할 ID를 만드는 것이고, 이 ID는 전역적 유  일성(globally unique)이 보장되는 것이어야 한다."


### URL 리디렉션 상세 설계
---
![[annotations/attachments/SystemDesignInterview/image-149-x104-y78.png|300]]



> [!QUOTE] Cache is used to store the pair of (`shortUrl`, `originUrl`)


### 4단계 마무리
---
**p.150** "처리율 제한 장치(rate limiter): 지금까지 살펴본 시스템은 엄청난 양의 URL  단축 요청이 밀려들 경우 무력화될 수 있다는 잠재적 보안 결함을 갖고 있  다."

**p.150** "웹 서버의 규모 확장: 본 설계에 포함된 웹 계층은 무상태(stateless) 계층이  므로, 웹 서버를 자유로이 증설하거나 삭제할 수 있다."

**p.150** "데이터베이스의 규모 확장: 데이터베이스를 다중화하거나 샤딩(sharding)  하여 규모 확장성을 달성할 수 있다."

 
# 9장 웹 크롤러 설계
---
**p.152** "웹 크롤러는 로봇(robot) 또는 스파이더(spider)라고도 부른다. 검색 엔진에  서 널리 쓰는 기술로, 웹에 새로 올라오거나 갱신된 콘텐츠를 찾아내는 것이  주된 목적"

**p.152** "콘텐츠는 웹 페이지일 수도 있고, 이미지나 비디오, 또  는 PDF 파일일 수도 있다."

**p.152** "검색 엔진 인덱싱(search engine indexing): 크롤러의 가장 보편적인 용례"

**p.152** "웹 아카이빙(web archiving): 나중에 사용할 목적으로 장기보관하기 위해  웹에서 정보를 모으는 절차"

**p.153** "웹 마이닝(web mining):...유명 금융 기업들은 크롤러를 사용해 주주  총회 자료나 연차 보고서(annual report)를 다운받아 기업의 핵심 사업 방향  을 알아내기도 한다."

**p.153** "웹 모니터링 (web monitoring). 크롤러를 사용하면 인터넷에서 저작권이나  상표권이 침해되는 사례를 모니터링"

**p.154** "웹 크롤러가 감당해야 하는 데이  터의 규모와 기능들을 알아내야만 한다."

 
## 1단계 문제 이해 및 설계 범위 확정
---
**p.154** "웹 크롤러의 기본 알고리즘은 간단하다.  1. URL 집합이 입력으로 주어지면, 해당 URL들이 가리키는 모든 웹 페이지를  다운로드한다.  2. 다운받은 웹 페이지에서 URL들을 추출한다.  3. 추출된 URL들을 다운로드할 URL 목록에 추가하고 위의 과정을 처음부터  반복한다."

**p.154** "주된 용도...검색 엔진 인덱싱"

**p.154** "매달 얼마나 많은 웹 페이지...10억개(1billion)의 웹 페이지를 수집"

**p.154** "새로 만들어진 웹 페이지나 수정된 웹 페이지도 고려"

**p.154** "수집한 웹 페이지는...5년간 저장"

**p.154** "중복된 콘텐츠를 갖는 페이지는 무시"

**p.155** "좋은 웹 크롤러가 만족 시켜야 할 속성? 규모 확장성 / 안정성 / 예절 / 확장성"


### 개략적 규모 추정
---
 
## 2단계 개략적 설계안 제시 및 동의 구하기
---
![[annotations/attachments/SystemDesignInterview/image-156-x77-y277.png|300]]


### 시작 URL 집합
---
**p.156** "어  떤 대학 웹사이트로부터 찾아 나갈 수 있는 모든 웹 페이지를 크롤링하는 가장  직관적인 방법은 해당 대학의 도메인 이름이 붙은 모든 페이지의 URL을 시작  URL로 쓰는 것"

**p.157** "전체 웹 크롤링해야 하는 경우에는...크롤러가 가능한 한 많은 링크를 탐색할 수 있도록 하는 URL을 고  르는 것이 바람직"


### 미수집 URL 저장소
---
**p.157** "크롤링 상태를 (1) 다운로드할 URL, 그리고 (2)  다운로드된 URL의 두 가지로 나눠 관리"

**p.157** "다운로드할 URL을 저 장관리하는 컴포넌트를 미수집 URL 저장소(URL frontier)라고 부른다. FIFO (First-In-First-Out) 큐(queue)라고 생각하면 된다."


### HTML 다운로더
---
**p.157** "인터넷에서 웹 페이지를 다운로드하는 컴포넌트"


### 도메인 이름 변환기
---
**p.157** "웹 페이지를 다운받으려면 URL을 IP 주소로 변환하는 절차가 필요"



> [!QUOTE] Why is it necessary in our system? Don't we usually expect DNS resolution to be automatic as built-in component...?


### 콘텐츠 파서
---
**p.157** "웹 페이지를 다운로드하면 파싱(parsing)과 검증(validation) 절차를 거쳐야 한...다. 이상한 웹 페이지는 문제를 일으킬 수 있는데다 저장 공간만 낭비하게 되  기 때문이다. 크롤링 서버 안에 콘텐츠 파서를 구현하면 크롤링 과정이 느려지  게 될 수 있으므로, 독립된 컴포넌트로 만들었다."


### 중복 콘텐츠인가?
---
**p.158** "두 HTML 문서를 비교하는 가장...효과적인 방법은 웹 페이  지의 해시 값을 비교하는 것이다"


### 콘텐츠 저장소
---
**p.158** "저장소를 구현하는 데  쓰일 기술을 고를 때는 저장할 데이터의 유형, 크기, 저장소 접근 빈도, 데이터  의 유효 기간 등을 종합적으로 고려해야 한다."

**p.158** "데이터 양이 너무 많으므로 대부분의 콘텐츠는 디스크에 저장"

**p.158** "인기 있는 콘텐츠는 메모리에 두어 접근 지연시간을 줄일 것"



> [!QUOTE] 인기 있는 콘텐츠를 읽어야 하는 니즈가 이 웹 크롤러 시스템에서 있는가?


### URL 추출기
---
**p.158** "상대 경로(relative path)는 전부 https://en.wiki  pedia.org를 붙여 절대 경로(absolute path)로 변환한다."

![[annotations/attachments/SystemDesignInterview/image-159-x113-y541.png|300]]


### URL 필터
---
**p.159** "URL 필터는 특정한 콘텐츠 타입이나 파일 확장자를 갖는 URL, 접속 시 오류가  발생하는 URL, 접근 제외 목록(deny list)에 포함된 URL 등을 크롤링 대상에서  배제하는 역할"


### 이미 방문한 URL?
---
**p.159** "이미 방문한 URL이나 미수집 URL 저장소에 보관  된 URL을 추적할 수 있도록 하는 자료 구조를 사용"

**p.159** "해당 자료 구조로는 블룸 필터 (bloom filter)나 해시 테이블이 널리 쓰인다.  블룸 필터나 해시 테이블의 구현 방법에 대해서는 여기서 구체적으로 다루지  않겠다."


### URL 저장소
---

### 웹 크롤러 작업 흐름
---
![[annotations/attachments/SystemDesignInterview/image-160-x74-y362.png|300]]

**p.160** "1 시작 URL들을 미수집 URL 저장소에 저장한다."

**p.160** "2 HTML 다운로더는 미수집 URL 저장소에서 URL 목록을 가져온다."

**p.160** "3 HTML 다운로더는 도메인 이름 변환기를 사용하여 URL의 IP 주소를 알아  내고, 해당 IP 주소로 접속하여 웹 페이지를 다운받는다."

**p.160** "4 콘텐츠 파서는 다운된 HTML 페이지를 파싱하여 올바른 형식을 갖춘 페이  지인지 검증한다."

**p.160** "5 콘텐츠 파싱과 검증이 끝나면 중복 콘텐츠인지 확인하는 절차를 개시한다."

**p.160** "6 중복 콘텐츠인지 확인하기 위해서, 해당 페이지가 이미 저장소에 있는지  본다....이미 저장소에 있는 콘텐츠인 경우에는 처리하지 않고 버린다....저장소에 없는 콘텐츠인 경우에는 저장소에 저장한 뒤 URL 추출기로 전  달한다."

**p.161** "7 URL 추출기는 해당 HTML 페이지에서 링크를 골라낸다."

**p.161** "8 골라낸 링크를 URL 필터로 전달한다."

**p.161** "9 필터링이 끝나고 남은 URL만 중복 URL 판별 단계로 전달한다."

**p.161** "10 이미 처리한 URL인지 확인하기 위하여, URL 저장소에 보관된 URL인지 살  핀다. 이미 저장소에 있는 URL은 버린다."

**p.161** "7 저장소에 없는 URL은 URL 저장소에 저장할 뿐 아니라 미수집 URL 저장소  에도 전달한다."

 
## 3단계 상세 설계
---

### DFS를 쓸 것인가, BFS를 쓸 것인가
---
**p.161** "웹 크롤러는 보통 BFS, 즉 너비 우선 탐색법(breadth-first search)을  사용한다. BFS는 FIFO(First-In-First-Out) 큐를 사용하는 알고리즘"

**p.162** "다음의 두 가지 문제점이 있다."

**p.162** "링크들을 병렬로 처리하게 된다면 위키피디아 서버는 수많은 요청으로 과  부하에 걸리게 될 것이다. 이런 크롤러는 보통 &#39;예의 없는(impolite)&#39; 크롤러  로 간주"

![[annotations/attachments/SystemDesignInterview/image-162-x116-y259.png|300]]

**p.162** "페이지 순  위(page rank), 사용자 트래픽의 양, 업데이트 빈도 등 여러 가지 척도에 비  추어 처리 우선순위를 구별하는 것이 온당할 것"


### 미수집 URL 저장소
---
**p.163** "미수집 URL 저장소를 활용하면 이런 문제를 좀 쉽게 해결할 수 있다. 앞서 살  펴본 대로, URL 저장소는 다운로드할 URL을 보관하는 장소다."

**p.163** "예의 바른 크롤러를 만드는 데 있어서 지켜야 할 한 가지 원칙은, 동일 웹 사이트에 대해서는 한 번에 한 페이지만 요청한다는 것"

**p.163** "같은 웹 사이트의 페이지를 다운받는 태스크는 시간차를 두고 실행하도록 하면 될 것이다. 이 요구사항을 만족시키려면 웹사이트의 호스트명(hostname)과 다운로드를 수행 하는 작업 스레드(worker thread) 사이의 관계를 유지"

**p.163** "큐라우터(queue router): 같은 호스트에 속한 URL은 언제나 같은 큐(b1,  b2..... bn)로 가도록 보장하는 역할"

**p.163** "매핑 테이블(mapping table): 호스트 이름과 큐  사이의 관계를 보관하는 테이블. 표 9-1과 같은  형태"

**p.163** "FIFO 큐(b1부터 n까지): 같은 호스트에 속한  URL은 언제나 같은 큐에 보관"

![[annotations/attachments/SystemDesignInterview/image-163-x372-y82.png|300]]

![[annotations/attachments/SystemDesignInterview/image-164-x95-y402.png|300]]

**p.164** "큐 선택기 (queue selector): 큐 선택기는 큐들을 순회하면서 큐에서 URL을  꺼내서 해당 큐에서 나온 URL을 다운로드하도록 지정된 작업 스레드에 전  달하는 역할"

**p.164** "작업 스레드(worker thread): 작업 스레드는 전달된 URL을 다운로드하는 작  업을 수행한다. 전달된 URL은 순차적으로 처리될 것이며, 작업들 사이에는  일정한 지연시간(delay)을 둘 수 있다."


### 우선순위
---
**p.164** "유용성에 따라 URL의 우선순위를 나눌 때는 페이지랭크(PageRank)101, 트래...픽 양, 갱신 빈도(update frequency) 등 다양한 척도를 사용할 수 있을 것"

**p.165** "순위결정장치(prioritizer)는 URL 우선순위를 정하는 컴포넌  트"

**p.165** "그림 9-7은 URL 우선순위를 고려하여 변경한 설계"

![[annotations/attachments/SystemDesignInterview/image-165-x102-y330.png|300]]

**p.165** "순위결정장치(prioritizer): URL을 입력으로 받아 우선순위를 계산"

**p.165** "큐(f1,・・・ fn): 우선순위별로 큐가 하나씩 할당된다. 우선순위가 높으면 선택  될 확률도 올라간다."

**p.165** "큐 선택기: 임의 큐에서 처리할 URL을 꺼내는 역할을 담당한다. 순위가 높  은 큐에서 더 자주 꺼내도록 프로그램되어 있다."

**p.165** "그림 9-8은 이를 반영한 전체 설계"

**p.165** "전면 큐(front queue): 우선순위 결정 과정을 처리한다."

**p.165** "후면 큐(back queue): 크롤러가 예의 바르게 동작하도록 보증한다."

![[annotations/attachments/SystemDesignInterview/image-166-x98-y163.png|300]]


### 신선도
---
**p.166** "데이터의 신선함  (freshness)을 유지하기 위해서는 이미 다운로드한 페이지라고 해도 주기적으...로 재수집(recrawl)할 필요가 있다."

**p.167** "이 작업을 최적화하기 위한 전략으로는 다음  과 같은 것"

**p.167** "웹 페이지의 변경 이력(update history) 활용"

**p.167** "우선순위를 활용하여, 중요한 페이지는 좀 더 자주 재수집"


### 미수집 URL 저장소를 위한 지속성 저장장치
---
**p.167** "대부분의 URL은 디스크에 두지만 IO 비용을 줄이기 위해 메모리 버퍼에 큐를 두는 것이다. 버퍼 에 있는 데이터는 주기적으로 디스크에 기록할 것"


### HTML 다운로더
---
**p.169** "도메인 이름 변환기(DNS Resolver)는 크롤러 성능의 병목 중 하나인데, 이는  DNS 요청을 보내고 결과를 받는 작업의 동기적 특성 때문"

**p.169** "따라서 DNS 조회 결과로 얻어진 도메인 이름과 IP 주소 사이의 관계를 캐시에  보관해 놓고 크론 잡(cron job) 등을 돌려 주기적으로 갱신하도록 해 놓으면 성  능을 효과적으로 높일 수 있다."

**p.169** "크롤링 서버가  크롤링 대상 서버와 지역적으로 가까우면 페이지 다운로드 시간은 줄어들 것  이다."

**p.169** "최대 얼마나 기다릴지를 미리 정해  두는 것이다. 이 시간 동안 서버가 응답하지 않으면 크롤러는 해당 페이지 다  운로드를 중단하고 다음 페이지로 넘어간다."

**p.170** "새로운 형태의 콘텐츠를 쉽게 지원할 수 있도록 신경 써야 한다. 본 예제의 경우에는 새 로운 모듈을 끼워 넣음으로써 새로운 형태의 콘텐츠를 지원할 수 있도록 설계 하였다."

![[annotations/attachments/SystemDesignInterview/image-170-x29-y71.png|300]]

**p.171** "거미 덫(spider trap)은 크롤러를 무한 루프에 빠뜨리도록 설계한 웹 페이지"

![[annotations/attachments/SystemDesignInterview/image-171-x89-y354.png|300]]

**p.171** "이런 덫은 URL의 최대 길이를 제한하면 회피할 수 있다. 하지만 가능한 모든  종류의 덫을 피할 수 있는 만능 해결책은 없다."

 
## 4단계 마무리
---
**p.172** "시간이 허락한다면 면접관과 다  음과 같은 것을 추가로 논의해보면 좋을 것"

**p.172** "서버 측 렌더링(server-side rendering): 많은 웹사이트가 자바스크립트(Java  Script), AJAX 등의 기술을 사용해서 링크를 즉석에서 만들어 낸다."

**p.172** "페이지를 파싱하기 전에  서버 측 렌더링(동적 렌더링dynamic rendering이라고도 불린다)을 적용"

**p.172** "스팸 방지(anti-spam) 컴포넌트를 두어 품질이 조악하거나 스팸성인  페이지를 걸러내도록 해 두면 좋다."

**p.172** "다중화(replication)나 샤딩(sharding) 같은  기법을 적용하면 데이터 계층(data layer)의 가용성, 규모 확장성, 안정성이  향상"

**p.172** "수평적  규모 확장성을 달성하는 데 중요한 것은 서버가 상태정보를 유지하지 않도  록 하는 것, 즉 무상태(stateless) 서버로 만드는 것"

**p.173** "데이터 분석 솔루션(analytics): 데이터를 수집하고 분석하는 것은 어느 시스  템에게나 중요"

**p.174** "https://developers.google.com/search/docs/  guides/dynamic-rendering"

 
# 10장  알림 시스템 설계
---
**p.175** "알림 시스템은 단순히 모바일 푸시 알림(mobile push notification)에 한정되  지 않는다. 사실 알림 시스템은 모바일 푸시 알림, SMS 메시지, 그리고 이메일  의 세 가지로 분류할 수 있다."

![[annotations/attachments/SystemDesignInterview/image-175-x91-y76.png|300]]

 
## 1단계 문제 이해 및 설계 범위 확정
---
**p.176** "알림 시스템이 어떻게 구현되는지에 대한 깊은 이해가 필요"

**p.176** "어떤 종류의 알림을 지원...푸시 알림 SMS 메시지, 그리고 이메일"

**p.176** "실시간(real-time) 시스템이어야 하나...연성 실시간(soft real-time) 시스템이라고 가정"

**p.176** "어떤 종류의 단말을 지원"

**p.176** "iOS 단말, 안드로이드(android) 단말, 그리고 랩톱/데스크톱을 지원"

**p.176** "알림은 누가 만들 수 있나요?...클라이언트 애플리케이션 프로그램이 만들 수도 있구요. 서버 측에서  스케줄링 할 수도 있습니다."

**p.176** "알림을 받지 않도록(opt-out) 설정할 수도 있어야"

**p.176** "천만 건의 모바일 푸시 알림, 백만 건의 SMS 메시지, 5백만 건의 이메  일을 보낼 수 있어야"

 
## 2단계 개략적 설계안 제시 및 동의 구하기
---

### 알림 유형별 지원 방안
---
**p.177** "iOS에서 푸시 알림을 보내기 위해서는 세 가지 컴포넌트가 필요"

![[annotations/attachments/SystemDesignInterview/image-177-x157-y464.png|300]]

**p.178** "안드로이드 푸시 알림도 비슷한 절차로 전송된다. APNS 대신 FCM(Firebase  Cloud Messaging)을 사용한다는 점만 다르다."

![[annotations/attachments/SystemDesignInterview/image-178-x139-y549.png|300]]

**p.178** "SMS 메시지를 보낼 때는 보통 트윌리오(Twilio), 넥스모(Nexmo)21 같은 제3  사업자의 서비스를 많이 이용"

**p.178** "많  은 회사가 상용 이메일 서비스를 이용"


### 연락처 정보 수집 절차
---
**p.179** "알림을 보내려면 모바일 단말 토큰, 전화번호, 이메일 주소 등의 정보가 필요"

![[annotations/attachments/SystemDesignInterview/image-180-x98-y505.png|300]]


### 개략적 설계안 (초안)
---
**p.180** "1부터 N까지의 서비스"

**p.180** "알림 시스템(notification system)...서비스 1~N에 알림 전송을 위한 API를 제공해야 하고, 제3자 서비스에  전달할 알림 페이로드(payload)를 만들어 낼 수 있어야 한다."

**p.180** "제3자 서비스(third party services): 이 서비스들은 사용자에게 알림을 실제  로 전달하는 역할을 한다."

![[annotations/attachments/SystemDesignInterview/image-181-x82-y432.png|300]]

**p.181** "또 하나 고려해야 할 것은, 어떤 서비스는  다른 시장에서는 사용할 수 없을 수도 있다는 것"


### 개략적 설계안 (개선된 버전)
---
**p.182** "데이터베이스와 캐시를 알림 시스템의 주 서버에서 분리"

**p.182** "알림 서버를 증설하고 자동으로 수평적 규모 확장이 이루어질 수 있도록  한다."

**p.182** "메시지 큐를 이용해 시스템 컴포넌트 사이의 강한 결합을 끊는다."

![[annotations/attachments/SystemDesignInterview/image-182-x62-y59.png|300]]

**p.184** "데이터베이스(DB): 사용자, 알림, 설정 등 다양한 정보를 저장"

**p.184** "메시지 큐(message queue): 시스템 컴포넌트 간 의존성을 제거하기 위해 사  용"

**p.184** "작업 서버(workers): 메시지 큐에서 전송할 알림을 꺼내서 제3자 서비스로  전달하는 역할을 담당"

 
## 3단계 상세 설계
---

### 데이터 손실 방지
---
**p.185** "어떤 상황에서도 알  림이 소실되면 안 된다는 것이다. 알림이 지연되거나 순서가 틀려도 괜찮지만,  사라지면 곤란하다"

**p.185** "이 요구사항을 만족하려면 알림 시스템은 알림  데이터를 데이터베이스에 보관하고 재시도 메커니즘을 구현해야 한다."


### 알림 중복 전송 방지
---
**p.185** "여러 번 반복되는 것을 완전히 막는 것은 가능하지 않다"

**p.186** "그 빈도를 줄이려면 중복을 탐지하는  메커니즘을 도입하고, 오류를 신중하게 처리해야 한다."

**p.186** "지금부  터는 알림 템플릿, 알림 설정, 이벤트 추적, 시스템 모니터링, 처리율 제한 등  알림 시스템 구현을 위해 필요한 추가 컴포넌트들에 대해 알아보자."


### 알림 템플릿
---

### 알림 설정
---
**p.187** "이 정보는 알림 설정 테이블에 보관되며, 이 테이블에는 아마 다음과  같은 필드들이 필요할 것"

![[annotations/attachments/SystemDesignInterview/image-187-x90-y433.png|300]]


### 전송률 제한
---
**p.187** "한 사용자  가 받을 수 있는 알림의 빈도를 제한"



> [!QUOTE] 데이터 손실 방지 원칙은 여전히 유지해야 한다. 다만 그 알림이 전송되는 빈도를 제한하여 사용자의 피로도를 낮추고자 하는 것


### 재시도 방법
---
**p.187** "해당 알림을 재시도 전용 큐에 넣는다.  같은 문제가 계속해서 발생하면 개발자에게 통지"


### 푸시 알림과 보안
---

### 큐 모니터링
---
**p.188** "알림 시스템을 모니터링 할 때 중요한 메트릭(metric) 하나는 큐에 쌓인 알림의  개수"


### 이벤트 추적
---
**p.189** "지금까지 설명한 내용을 모두 반영하여 수정한 설계안"

![[annotations/attachments/SystemDesignInterview/image-189-x51-y167.png|300]]

 
## 4단계 마무리
---
**p.190** "넷플릭  스 신작 영화 출시 정보, 신규 상품에 대한 할인 쿠폰 이메일, 온라인 쇼핑 결제  확정 메시지 같은 것이 전부 이 알림 기능을 통해 제공되는 것"


