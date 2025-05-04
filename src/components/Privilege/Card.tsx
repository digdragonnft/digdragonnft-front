import Link from "next/link";

interface PrivilegeCardProps {
  hero: string;
  avatar: string;
  title: string;
  content: string;
  link: string;
}
export default function PrivilegeCard({
  hero,
  avatar,
  title,
  content,
  link,
}: PrivilegeCardProps) {
  return (
    <div className="card w-64 bg-base-100 shadow-xl">
      <figure className="h-36 overflow-hidden">
        <img src={hero} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <img src={avatar} className="avatar-circle avatar w-12" />
          {title}
        </h2>
        <p className="max-h-[50px] overflow-scroll">{content}</p>
        <div className="card-actions justify-end">
          <Link href={link} className="btn btn-primary">
            Claim Now
          </Link>
        </div>
      </div>
    </div>
  );
}
