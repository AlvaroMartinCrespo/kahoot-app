import { Spinner } from '@nextui-org/react';

export default function Loading({ title }) {
  return (
    <>
      <Spinner label={title} color="warning" />
    </>
  );
}
