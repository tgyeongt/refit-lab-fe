import { cn } from '@/app/event/(util)/event-styles';

// 예약 상세 페이지 스타일
export const bookingStyles = {
  /** Typography */
  text: {
    // 히어로 제목 (32px, semibold)
    heroTitle: cn(
      'text-[32px]',
      'font-semibold',
      'leading-[0.625]',
      'tracking-[-0.015625em]'
    ),
    // 섹션 제목 (18px, semibold)
    sectionTitle: cn(
      'text-[18px]',
      'font-semibold',
      'leading-[1.111]',
      'tracking-[-0.027em]'
    ),
    // 본문 (16px, normal)
    body: cn(
      'text-[16px]',
      'font-normal',
      'leading-[1.875]',
      'tracking-[-0.03125em]'
    ),
    // 본문 작은 글씨 (14px, medium)
    bodySm: cn(
      'text-[14px]',
      'font-medium',
      'leading-[1.428]',
      'tracking-[-0.035em]'
    ),
    // 버튼 텍스트 (18px, semibold)
    buttonText: cn(
      'text-[18px]',
      'font-semibold',
      'leading-[1.111]',
      'tracking-[-0.027em]'
    ),
    // 갤러리 더보기 (12px, semibold)
    galleryMore: cn(
      'text-[12px]',
      'font-semibold',
      'leading-[1.666]',
      'tracking-[-0.041em]'
    ),
  },

  /** Colors (Figma 디자인 토큰) */
  color: {
    // 텍스트 색상
    textPrimary: cn('text-[#141414]'), // black
    textSecondary: cn('text-[#424242]'), // gray_5A
    textWhite: cn('text-white'),
    textPurple: cn('text-[#642C8D]'), // purple

    // 배경 색상
    bgWhite: cn('bg-white'),
    bgPurple: cn('bg-[#642C8D]'), // purple
    bgPurpleLight: cn('bg-[#EDD5F2]'), // purple2
    bgPage: cn('bg-[#FCFCFC]'), // 페이지 배경

    // 테두리 색상
    borderGray: cn('border-[#E0E0E0]'), // gray_4
  },

  /** Layout */
  layout: {
    // Flex 레이아웃
    flexRow: cn('flex', 'flex-row'),
    flexCol: cn('flex', 'flex-col'),
    flexBetween: cn('flex', 'items-center', 'justify-between'),
    flexCenter: cn('flex', 'items-center', 'justify-center'),

    // 간격
    gap2: cn('gap-2'),
    gap4: cn('gap-4'),
    px4: cn('px-4'),
    px6: cn('px-6'),
    py2: cn('py-2'),
    py4: cn('py-4'),

    // 여백
    mb4: cn('mb-4'),
    mb5: cn('mb-5'),
    mb6: cn('mb-6'),

    // 그림자
    shadow: cn('shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]'),
  },

  /** Components */
  component: {
    // 카드 스타일
    card: cn(
      'bg-white',
      'rounded-lg',
      'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]',
      'overflow-hidden'
    ),
    // 정보 카드
    infoCard: cn(
      'bg-white',
      'border',
      'border-[#E0E0E0]',
      'rounded-lg',
      'p-6',
      'shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)]'
    ),
    // 버튼 (CTA)
    buttonCTA: cn(
      'w-full',
      'h-[60px]',
      'rounded-lg',
      'bg-[#642C8D]',
      'text-white',
      'font-semibold',
      'flex',
      'items-center',
      'justify-center',
      'transition-colors',
      'hover:bg-[#54257D]',
      'active:bg-[#4A2270]',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    ),
    // 작은 버튼 (자세히 알아보기)
    buttonSmall: cn(
      'px-[15px]',
      'py-[7px]',
      'rounded-[30px]',
      'bg-[#EDD5F2]',
      'text-[#642C8D]',
      'text-[14px]',
      'font-medium',
      'transition-colors',
      'hover:bg-[#E5C8EC]'
    ),
    // 이미지 컨테이너
    imageContainer: cn('relative', 'w-full', 'h-full', 'overflow-hidden'),
    // 갤러리 그리드 (2x2)
    galleryGrid: cn('grid', 'grid-cols-2', 'gap-2', 'w-full'),
    // 갤러리 아이템
    galleryItem: cn(
      'relative',
      'aspect-square',
      'overflow-hidden',
      'rounded-lg'
    ),
  },
} as const;
