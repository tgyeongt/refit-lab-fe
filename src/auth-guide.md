# Auth 상태(로그인/유저) 사용 가이드

## Zustand persist(authStore) = Source of Truth

이 프로젝트의 인증 상태는 **Zustand persist(authStore)**가 관리합니다.  
**localStorage를 직접 읽거나 쓰지 않습니다.** (persist가 localStorage를 내부적으로 사용/관리)

---

## ✅ 핵심 규칙 (반드시)

- **토큰/로그인 여부는 `useAuth()` / `useAuthInfo()`로만 읽는다.**
- **유저 정보/인증 필요 API(Query)는 `hydrated && isLoggedIn`일 때만 실행한다.** (`enabled` 필수)
- **로그인 성공 시 `actions.setAccessToken(token)`만 호출한다.**
  - persist가 localStorage 저장까지 자동 처리
- **`localStorage.getItem("accessToken")`로 화면 가드/요청 제어 금지**
- **`setIsLoggedIn(true/false)` 같은 수동 토글 금지**
  - 구조상 필요 없음, 토큰/상태 불일치로 오류 유발 가능

---

## 1) Store에서 제공하는 값

- `accessToken: string | null` : 인증 토큰
- `isLoggedIn: boolean` : 토큰 존재 여부 기반
- `hydrated: boolean` : persist가 localStorage 복원 완료 여부
- `user: MyPageUser | null` : 필요 시 서버에서 받아 저장

---

## 2) 올바른 사용 패턴

### 2-1) 인증 상태 읽기

````ts
import { useAuthInfo } from "@/shared/stores/useAuthStore";

const { hydrated, isLoggedIn, accessToken, user } = useAuthInfo();

## 2-2) “유저 정보가 필요한 Query” 작성 규칙 (TanStack Query)

- **`enabled: hydrated && isLoggedIn` 필수**
- Next.js 초기 렌더 시점에는 persist 복원이 아직 안 끝났을 수 있음
  → 토큰이 없다고 판단해 불필요한 실패/무한요청 가능

```typescript
import { useQuery } from "@tanstack/react-query";
import { useAuthInfo } from "@/shared/stores/useAuthStore";
import { getMyPage } from "@/app/my/(api)/getMyPage";

export function useMyPageQuery() {
  const { hydrated, isLoggedIn } = useAuthInfo();

  return useQuery({
    queryKey: ["myPage"],
    queryFn: getMyPage,
    enabled: hydrated && isLoggedIn, // ✅ 필수
  });
}
````

## 2-3) 로그인 성공 시 처리 (토큰 저장)

- localStorage 직접 저장 ❌
- store action만 호출 ✅
  - `persist`가 localStorage 저장까지 자동 처리

```typescript
import { privateAPI } from "@/shared/api/apiInstance";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export async function testLogin() {
  const res = await privateAPI.post("/auths/test-login");
  const accessToken = res.data?.data;

  if (accessToken) {
    useAuthStore.getState().actions.setAccessToken(accessToken);
    // ✅ persist가 localStorage 저장까지 자동 처리
  }

  return res.data;
}
```

## 2-4) 화면 진입 가드(AuthGate) 패턴

- `hydrated` 전에는 렌더를 막아서(또는 스플래시/스켈레톤) **persist 복원 전 깜빡임/오판단**을 방지합니다.
- 로그인 상태가 아니면 보호 화면을 보여주고, 로그인 상태면 자식 컴포넌트를 렌더링합니다.

```typescript
"use client";

import React from "react";
import { useAuthInfo } from "@/shared/stores/useAuthStore";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { hydrated, isLoggedIn } = useAuthInfo();

  if (!hydrated) return null;
  if (!isLoggedIn) return <div>로그인이 필요합니다</div>;

  return <>{children}</>;
}
```

## 3) 금지 사항 (자주 터지는 원인)

### ❌ localStorage 직접 접근으로 판단/제어

```typescript
// ❌ 금지
const token = localStorage.getItem("accessToken");
```

### ❌ localStorage 직접 저장

```typescript
// ❌ 금지
localStorage.setItem("accessToken", token);
```

### ❌ 수동 로그인 토글(setIsLoggedIn)

```typescript
// ❌ 금지 (토큰과 상태 불일치, 무한 렌더/무한 요청 원인)
actions.setIsLoggedIn(true);
```

## 4) 왜 `hydrated`가 필요한가?

Next.js(Client Component)에서 첫 렌더 시점에는:

- `persist`가 localStorage에서 값을 아직 복원 전일 수 있음
- 이 상태에서 Query를 실행하면 토큰이 없다고 판단  
  → 불필요한 실패/무한요청/경고 발생 가능

따라서 **유저 인증이 필요한 Query는 무조건 아래 조건으로 안전하게 막아야 합니다.**

```typescript
enabled: hydrated && isLoggedIn;
```
