import { IoIosStar } from "react-icons/io";


const Stars = ({ rate, count }) => {

  const ratings = Array.from({ length: 5 }, (_, index) => {

    return <span key={index}>
      {rate >= index + 0.5 ? (
        <IoIosStar className="text-warning" />
      ) : (
        <IoIosStar />
      )}
    </span>
  })
  return (
    <>
      <span className="fs-5">{ratings}</span>
      <span className="text-secondary ms-1">
        &#40;{count}&#41;
      </span>
    </>
  )
}

export default Stars;