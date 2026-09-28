interface ComponentCardProps {
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
}

const ComponentCardParticipants: React.FC<ComponentCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl shadow p-10 ${className}`}
    >
        {children}
    </div>
  );
};

export default ComponentCardParticipants;
