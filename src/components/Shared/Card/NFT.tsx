const NBadge = () => {
  return (
    <button className="btn btn-circle btn-sm  bg-[#D9D9D9] text-xs ">
      46%
    </button>
  );
};
const RBadge = () => {
  return (
    <button className="btn btn-circle text-base-200 btn-sm  bg-[#093B49] text-xs ">
      30%
    </button>
  );
};
const SRBadge = () => {
  return (
    <button className="btn btn-circle text-base-200 btn-sm  bg-[#B39929] text-xs ">
      20%
    </button>
  );
};
const SSRBadge = () => {
  return (
    <button className="btn btn-circle btn-sm  bg-[#8BD2B9] text-xs  text-[#EA580C]">
      4%
    </button>
  );
};

const data = [
  {
    image: "images/n.gif",
    title: "N",
    subtitle: "Hash Power 10,000",
    badge: <NBadge />,
  },
  {
    image: "images/r.gif",
    title: "R",
    subtitle: "Hash Power 15,000",
    badge: <RBadge />,
  },
  {
    image: "images/sr.gif",
    title: "SR",
    subtitle: "Hash Power 20,000",
    badge: <SRBadge />,
  },
  {
    image: "images/ssr.gif",
    title: "SSR",
    subtitle: "Hash Power 30,000",
    badge: <SSRBadge />,
  },
];

interface NFTCardProp {
  rarity: 0 | 1 | 2 | 3;
}

const NFTCard = ({ rarity }: NFTCardProp) => {
  return (
    <>
      <div className="card bg-base-100 w-full max-w-[320px] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <figure className="overflow-hidden py-2">
          <img
            className=" w-96 rounded-3xl p-2"
            src={data[rarity]?.image}
            alt="nft-image"
          />
        </figure>
        <div className="px-2 py-2">
          <div className="flex justify-between rounded-xl px-3 py-2 shadow">
            <div className="">
              <div className="stat-title text-primary">Type</div>
              <div className="text-neutral text-2xl font-bold">
                {data[rarity]?.title}
              </div>
              <div className="stat-desc">{data[rarity]?.subtitle}</div>
            </div>
            <div className="stat-figure text-primary">
              {data[rarity]?.badge}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTCard;
