import Image from "next/image";
import CameraIcon from "@/assets/icon/camera-2.svg";
import CloseIcon from "@/assets/icon/close.svg";

interface Props {
  files: File[];
  onChange: (files: File[]) => void;
  max?: number;
}

export default function ImageUploader({ files, onChange, max = 4 }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const nextFiles = [...files, ...selectedFiles].slice(0, max);
    onChange(nextFiles);
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const nextFiles = files.filter((_, i) => i !== index);
    onChange(nextFiles);
  };

  return (
    <div className="mb-4">
      <div className="flex gap-[10px]">
        {/* 업로드 버튼 */}
        {files.length < max && (
          <label
            htmlFor="photo-upload"
            className="
              w-[90px] h-[90px]
              rounded-[8px] bg-[#F5F5F7]
              flex flex-col items-center justify-center
              cursor-pointer
              text-[#9E9E9E] text-[12px]
            "
          >
            <CameraIcon width={22} height={20} color="#424242" />
            <p className="mt-[5px]">
              {files.length}/{max}
            </p>
          </label>
        )}

        {/* 미리보기 리스트 */}
        <div className="flex gap-[10px]">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="
                relative w-[90px] h-[90px]
                rounded-[8px]
                overflow-hidden
              "
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                fill
                className="object-cover"
              />

              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="
                  absolute top-[4px] right-[4px]
                  w-[20px] h-[20px]
                  rounded-full
                  bg-black/60
                  flex items-center justify-center
                "
              >
                <CloseIcon width={10} height={10} color="#FFFFFF" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
