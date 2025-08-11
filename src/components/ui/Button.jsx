import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  icon: Icon,
  className = "",
  ...props
}) => {
  const baseClasses =
    "rounded-lg font-medium transition-colors duration-200 flex items-center justify-center";

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-green-500 text-white hover:bg-green-600",
    secondary:
      "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className={children ? "mr-2" : ""} />}
      {children}
    </motion.button>
  );
};

export default Button;
