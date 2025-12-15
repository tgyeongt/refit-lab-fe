"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Icon from "@/shared/components/Icon";
import XIcon from "@/assets/icon/X.svg";
import { MAX_FILE_SIZE_MB, validateFilesSize } from "../util/file-validation";

interface FileUploaderProps {
  onChange?: (file: File | null) => void;
  onMultipleChange?: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  gridCols?: 2 | 4;
  customUI?: boolean; // 커스텀 UI 사용 여부
  customUploadButton?: React.ReactNode; // 커스텀 업로드 버튼
  maxFileSize?: number; // 최대 파일 크기 (MB, 기본값: 5MB)
}

// 파일 업로드 및 미리보기 컴포넌트 (단일/다중 지원)
export const FileUploader = ({
  onChange,
  onMultipleChange,
  multiple = false,
  maxFiles = 10,
  gridCols = 2,
  customUI = false,
  customUploadButton,
  maxFileSize = MAX_FILE_SIZE_MB,
}: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 다중 이미지 미리보기 URL 생성
  useEffect(() => {
    if (multiple && uploadedFiles.length > 0) {
      const previewUrls = uploadedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(previewUrls);

      return () => {
        previewUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [uploadedFiles, multiple]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (multiple) {
      // 다중 업로드 모드
      const newFiles = Array.from(files);
      const remainingSlots = maxFiles - uploadedFiles.length;
      const filesToAdd = newFiles.slice(0, remainingSlots);

      // 파일 크기 검증 (5MB 제한)
      const validation = validateFilesSize(filesToAdd);
      if (!validation.valid && validation.errors) {
        alert(validation.errors.join("\n"));
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      const updatedFiles = [...uploadedFiles, ...filesToAdd];
      setUploadedFiles(updatedFiles);
      onMultipleChange?.(updatedFiles);

      // input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      // 단일 업로드 모드
      const file = files[0];
      if (file) {
        // 이미지 파일만 허용
        if (!file.type.startsWith("image/")) {
          alert("이미지 파일만 업로드 가능합니다.");
          return;
        }

        // 파일 크기 검증 (5MB 제한)
        const validation = validateFilesSize([file]);
        if (!validation.valid && validation.errors) {
          alert(validation.errors.join("\n"));
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          return;
        }

        onChange?.(file);

        // 미리보기 생성
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setPreview(null);
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveMultiple = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onMultipleChange?.(newFiles);
  };

  // 다중 업로드 모드
  if (multiple) {
    const gridColsClass = gridCols === 4 ? "grid-cols-4" : "grid-cols-2";

    return (
      <div className="flex flex-col gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {/* 이미지 미리보기 그리드 */}
        {previews.length > 0 && (
          <div className={`grid ${gridColsClass} gap-3 mb-3`}>
            {previews.map((previewUrl, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden border border-[#E0E0E0] bg-gray-100">
                  <img
                    src={previewUrl}
                    alt={`선택한 이미지 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* 삭제 버튼 */}
                  <button
                    type="button"
                    onClick={() => handleRemoveMultiple(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-sm font-bold">×</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 파일 선택 버튼 */}
        {uploadedFiles.length < maxFiles &&
          (customUploadButton ? (
            <div onClick={handleClick} className="cursor-pointer">
              {customUploadButton}
            </div>
          ) : customUI ? null : (
            <button
              type="button"
              onClick={handleClick}
              className="flex items-center justify-center bg-[#E0E0E0] px-2.5 py-1.5 text-gray-5A rounded text-base font-medium cursor-pointer hover:bg-gray-5 transition-colors"
            >
              파일 선택 ({uploadedFiles.length}/{maxFiles})
            </button>
          ))}

        {uploadedFiles.length >= maxFiles && (
          <div className="text-center text-sm text-gray-500 py-2">
            최대 {maxFiles}개까지 선택 가능합니다.
          </div>
        )}
      </div>
    );
  }

  // 단일 업로드 모드 (기존 호환성 유지)
  return (
    <div className="border border-gray-6 rounded-md bg-white">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-start gap-4 px-3.5 py-3">
        {/* 파일 선택 버튼 */}
        <button
          type="button"
          onClick={handleClick}
          className="flex items-center justify-center bg-[#E0E0E0] px-2.5 py-1.5 text-gray-5A rounded text-base font-medium cursor-pointer hover:bg-gray-5 transition-colors"
        >
          파일 선택
        </button>

        {/* 미리보기 */}
        {preview && (
          <div className="relative w-[150px] h-[150px] border border-gray-6 rounded overflow-hidden">
            <Image
              src={preview}
              alt="썸네일 미리보기"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center cursor-pointer transition-colors"
            >
              <Icon icon={XIcon} width={16} height={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
