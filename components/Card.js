import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/Posts.module.css';
import { useWindowDimensions } from '../libs/WindowDimensions';

export default function Card(props) {
  const [onEnter, setOnEnter] = useState(false);
  const [mousePosition, setMousePosition] = useState([0, 0]);

  const { width, height } = useWindowDimensions();
  const desc = useRef(null);

  const mouseEnterHandler = (event) => {
    setOnEnter(true);
  };
  const mouseLeaveHandler = (event) => {
    setOnEnter(false);
  };
  const mouseMoveHandler = (event) => {
    setMousePosition([event.pageX, event.pageY]);
  };
  const getDescriptionTop = () => {
    let positionY = mousePosition[1] + 50;
    const descHeight = onEnter ? desc.current.getBoundingClientRect().height : 0;
    if (positionY + descHeight > height) {
      positionY = mousePosition[1] - 50 - descHeight;
    }
    return positionY;
  };

  return (
    <div className={styles.holder}>
      <div
        className={styles.card}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onMouseMove={mouseMoveHandler}
      >
        <a href={props.node.website} target="_blank" rel="noreferrer">
          <div className={styles.votes}>{props.node.votesCount.toLocaleString()}</div>
          <Image src={props.node.thumbnail.url} alt={props.node.name} width={200} height={150} />
          <div>{props.node.name}</div>
        </a>
      </div>

      <div
        ref={desc}
        className={styles.description}
        style={{
          top: getDescriptionTop(),
          display: onEnter ? 'block' : 'none',
        }}
      >
        {props.node.description}
      </div>
    </div>
  );
}
