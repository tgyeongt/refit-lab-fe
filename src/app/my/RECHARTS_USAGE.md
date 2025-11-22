# Recharts 사용법

마이페이지의 탄소량 그래프에 사용된 Recharts 라이브러리 사용법을 설명합니다.

## 설치

```bash
npm install recharts
```

## 기본 사용법

### 1. AreaChart (영역 차트)

```tsx
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { month: "1월", value: 100 },
  { month: "2월", value: 150 },
  { month: "3월", value: 200 },
];

<ResponsiveContainer width="100%" height="100%">
  <AreaChart data={data}>
    <Area
      type="monotone"
      dataKey="value"
      stroke="#642C8D"
      strokeWidth={2}
      fill="#642C8D"
    />
    <XAxis dataKey="month" />
    <YAxis />
  </AreaChart>
</ResponsiveContainer>;
```

### 2. 주요 컴포넌트 설명

#### ResponsiveContainer

- 그래프를 반응형으로 만들어주는 래퍼 컴포넌트
- 부모 컨테이너의 크기에 맞춰 자동으로 조절됨
- `width`와 `height`는 퍼센트 또는 숫자로 지정 가능

#### AreaChart

- 영역 차트를 그리는 메인 컴포넌트
- `data`: 차트에 표시할 데이터 배열
- `margin`: 차트 여백 설정

#### Area

- 실제 영역을 그리는 컴포넌트
- `dataKey`: 데이터에서 사용할 키 이름
- `type`: 선의 형태 (`monotone`, `linear`, `step` 등)
- `stroke`: 선 색상
- `strokeWidth`: 선 두께
- `fill`: 영역 채우기 색상

#### XAxis / YAxis

- 축을 표시하는 컴포넌트
- `hide`: 축을 숨김
- `dataKey`: X축에 표시할 데이터 키

### 3. 그라디언트 적용

```tsx
<AreaChart data={data}>
  <defs>
    <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
      <stop offset="36%" stopColor="#642C8D" stopOpacity={1} />
      <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
    </linearGradient>
  </defs>
  <Area
    dataKey="value"
    fill="url(#colorCarbon)" // 그라디언트 ID 참조
  />
</AreaChart>
```

### 4. 다른 차트 타입

#### LineChart (선 차트)

```tsx
import { LineChart, Line } from "recharts";

<LineChart data={data}>
  <Line type="monotone" dataKey="value" stroke="#642C8D" />
</LineChart>;
```

#### BarChart (막대 차트)

```tsx
import { BarChart, Bar } from "recharts";

<BarChart data={data}>
  <Bar dataKey="value" fill="#642C8D" />
</BarChart>;
```

#### PieChart (원형 차트)

```tsx
import { PieChart, Pie, Cell } from "recharts";

<PieChart>
  <Pie data={data} dataKey="value">
    {data.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index]} />
    ))}
  </Pie>
</PieChart>;
```

### 5. 실제 사용 예시 (마이페이지)

```tsx
"use client";

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const generateChartData = (carbonReduction: number) => {
  return [
    { month: "1월", value: 100 },
    { month: "2월", value: 150 },
    { month: "3월", value: 200 },
    { month: "4월", value: 300 },
    { month: "5월", value: 450 },
    { month: "6월", value: carbonReduction },
  ];
};

export const StatsCard = ({ carbonReduction }: { carbonReduction: number }) => {
  const chartData = generateChartData(carbonReduction);

  return (
    <div className="w-full h-[186px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="36%" stopColor="#642C8D" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#642C8D"
            strokeWidth={2}
            fill="url(#colorCarbon)"
          />
          <XAxis hide />
          <YAxis hide />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
```

## 주요 Props

### AreaChart

- `data`: 차트 데이터 배열
- `margin`: 여백 설정 `{ top, right, bottom, left }`
- `width`, `height`: 차트 크기 (ResponsiveContainer 사용 시 불필요)

### Area

- `dataKey`: 데이터 키 이름
- `type`: 선 타입 (`monotone`, `linear`, `step`, `stepBefore`, `stepAfter`)
- `stroke`: 선 색상
- `strokeWidth`: 선 두께
- `fill`: 채우기 색상 또는 그라디언트 URL

### XAxis / YAxis

- `dataKey`: 축에 표시할 데이터 키
- `hide`: 축 숨김 여부
- `tick`: 축 눈금 커스터마이징

## 참고 자료

- [Recharts 공식 문서](https://recharts.org/)
- [Recharts 예제](https://recharts.org/en-US/examples)
