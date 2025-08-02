// components/ui/tagInput.tsx
import React from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";

interface TagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  ({ placeholder, tags, setTags, className, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Cambiar valor input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    // Al presionar Enter o coma, agregar tag
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        const newTag = inputValue.trim();
        if (newTag && !tags.includes(newTag)) {
          setTags([...tags, newTag]);
        }
        setInputValue("");
      } else if (e.key === "Backspace" && inputValue === "") {
        // Eliminar último tag si input está vacío y presionan Backspace
        setTags(tags.slice(0, tags.length - 1));
      }
    };

    // Eliminar tag al hacer click
    const removeTag = (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
      <div>
        <div
          className={`
            flex flex-wrap gap-1 rounded-md border px-2 py-1 min-h-[36px] items-center
            ${tags.length !== 0 ? "mb-3" : ""}
            ${className ?? ""}
            `}
          onClick={() => inputRef.current?.focus()}
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-[2px] text-sm text-secondary-foreground"
            >
              {tag}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeTag(tag)}
                className="p-0"
                aria-label={`Eliminar ${tag}`}
              >
                <X size={14} />
              </Button>
            </span>
          ))}
          <Input
            {...props}
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            className="flex-1 min-w-[120px] border-none focus:ring-0 focus-visible:ring-0"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              const newTag = inputValue.trim();
              if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
              }
              setInputValue("");
            }}
            placeholder={tags.length === 0 ? placeholder : ""}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    );
  }
);

TagInput.displayName = "TagInput";

export { TagInput };
