interface CardProps{
  icon:string;
  title:string;
  desc:string;
}
function Card({item}:{item:CardProps}) {
  return (
    <div className="custom-card p-4 h-100 text-center">

                                        <div
                                            style={{
                                                fontSize: "3rem"
                                            }}
                                        >
                                            {item.icon}
                                        </div>

                                        <h5 className="mt-3">
                                            {item.title}
                                        </h5>

                                        <p>{item.desc}</p>

                                    </div>
  )
}

export default Card