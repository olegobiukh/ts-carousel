import { useEffect, useState } from "react";
import { getCats } from "../../api";
import "./index.scss";

type imageType = {
  id: String;
  created_at: String;
  tags: String[];
};

const Carousel: React.FC = () => {
  const [active, setActive] = useState<number>(0);
  const [allCats, setCats] = useState<string[] | null>(null);
  const [startingPoint, setStartingPoint] = useState<number>(0);
  const crsItm = document.querySelector(".carousel__item") as HTMLInputElement;

  const handleItemClick = (num: number): void => {
    setActive(num);
  };

  const handleButton = (dir: string): void => {
    if (allCats && active !== 0 && dir === "l") {
      setActive(active - 1);
    }
    if (allCats && active !== allCats.length && dir === "r") {
      setActive(active + 1);
    }
  };

  const getCatsNoiw = async () => {
    const cats = await getCats();
    const images: string[] = cats.map(
      (item: imageType) => `https://cataas.com/cat?id=${item.id}`
    );

    setCats(images);
  };

  useEffect(() => {
    if (crsItm) {
      const itemWidth: null | number = crsItm.offsetWidth;
      const horW: null | number = itemWidth * active;
      (
        document.querySelector(".carousel__container") as HTMLInputElement
      ).style.transform = `translateX(${startingPoint - horW}px)`;
    }
  }, [active]);

  useEffect(() => {
    if (document.querySelector(".carousel__item")) {
      const crsItm = document.querySelector(
        ".carousel__item"
      ) as HTMLInputElement;
      const crsWrp = document.querySelector(
        ".carousel__wrapper"
      ) as HTMLInputElement;
      const cntCntnr = document.querySelector(
        ".carousel__container"
      ) as HTMLInputElement;

      const containerWidth = crsWrp.offsetWidth;
      const itemWidth = crsItm.offsetWidth;
      const startPoint = containerWidth / 2 - itemWidth / 2;

      setStartingPoint(startPoint);
      cntCntnr.style.transform = `translateX(${startPoint}px)`;
    }
  }, [allCats]);

  useEffect(() => {
    getCatsNoiw();
  }, []);

  return (
    <div className="carousel">
      <div className="carousel__btn" onClick={() => handleButton("l")}>
        &lArr;
      </div>
      <div className="carousel__wrapper">
        <div className="carousel__container">
          {allCats &&
            allCats.map((item, index) => (
              <img
                src={item}
                key={index}
                className={`carousel__item ${
                  active === index ? "carousel__item--active" : ""
                }`}
                onClick={() => handleItemClick(index)}
              />
            ))}
        </div>
      </div>
      <div className="carousel__btn" onClick={() => handleButton("r")}>
        &rArr;
      </div>
    </div>
  );
};

export default Carousel;
