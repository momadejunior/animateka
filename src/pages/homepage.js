import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {motion} from 'framer-motion';

export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 100, opacity: 0 }}
  transition={{
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
    duration: 0.5,
  }}
>


    <Slider {...settings}>

      <h1 id="title">Titulo</h1>

        <div>
            <div className="bg-01"></div>
        </div>

      <div>
        <h3>2</h3>
      </div>

      <div>
        <h3>3</h3>
      </div>

      <div>
        <h3>4</h3>
      </div>

      <div>
        <h3>5</h3>
      </div>
      
      <div>
        <h3>6</h3>
      </div>


      <script>
        
      </script>
    </Slider>
    </motion.div>
  );
}
