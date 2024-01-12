export default function GridSpacer({ span = 1 }: { span?: number }) {
  return <div className={`col-span-${span.toString()}`}></div>;
}
