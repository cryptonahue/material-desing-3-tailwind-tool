import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "text" | "elevated" | "tonal";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  children,
  ...props
}) => {
  const baseClasses = "px-6 py-2 rounded-full font-semibold focus:outline-none focus:ring-2";

  const variantClasses = {
    filled: "bg-primary text-onPrimary",
    outlined: "border border-outline text-primary",
    text: "text-primary",
    elevated: "bg-surface shadow-lg text-primary",
    tonal: "bg-secondaryContainer text-onSecondaryContainer",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  );
};

export const ButtonPreview: React.FC = () => {
    return (
        <div className="p-4 bg-background rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-onSurface">Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center">
                <Button variant="filled">Filled</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
                <Button variant="elevated">Elevated</Button>
                <Button variant="tonal">Tonal</Button>
            </div>
        </div>
    )
}
