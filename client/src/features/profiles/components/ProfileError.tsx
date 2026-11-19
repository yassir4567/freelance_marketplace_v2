interface ProfileErrorProps {
  error: string;
}

export default function ProfileError({ error }: ProfileErrorProps) {
  return <div>{error}</div>;
}
