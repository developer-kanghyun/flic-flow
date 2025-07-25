interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    lightGrey: string;
    darkGrey: string;
  };
  // 다른 전역 스타일 변수 (예: 폰트 크기, 간격 등)를 여기에 추가할 수 있습니다.
}

export const theme: Theme = {
  colors: {
    primary: '#F0A500', // 포인트 컬러 1
    secondary: '#E45826', // 포인트 컬러 2
    accent: '#F0A500', // 강조 색상 (primary와 동일하게 설정)
    background: '#1B1A17', // 메인 컬러 (다크 테마 배경)
    text: '#E0E0E0', // 밝은 텍스트 색상
    lightGrey: '#333333',
    darkGrey: '#0A0A0A',
  },
};
