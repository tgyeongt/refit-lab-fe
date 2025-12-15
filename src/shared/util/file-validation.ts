// 파일 크기 검증 유틸리티

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// 파일 크기 검증 (5MB 제한)
export const validateFileSize = (
  file: File
): { valid: boolean; error?: string } => {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `파일 크기는 5MB 이하여야 합니다. (현재: ${(
        file.size /
        1024 /
        1024
      ).toFixed(2)}MB)`,
    };
  }
  return { valid: true };
};

// 여러 파일 크기 검증
export const validateFilesSize = (
  files: File[]
): { valid: boolean; errors?: string[] } => {
  const errors: string[] = [];

  files.forEach((file, index) => {
    const result = validateFileSize(file);
    if (!result.valid && result.error) {
      errors.push(`${file.name}: ${result.error}`);
    }
  });

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
};

// 파일 크기를 MB로 변환
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 MB";
  const mb = bytes / 1024 / 1024;
  return `${mb.toFixed(2)} MB`;
};

// 최대 파일 크기 상수
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE;
export const MAX_FILE_SIZE_MB = 5;
