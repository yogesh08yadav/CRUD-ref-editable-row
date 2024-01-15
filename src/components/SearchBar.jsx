import { useEffect, useState } from "react";

const accessKey = "eO9IpqcJQZ6a-wKP5C6gzCVbDLLRO_TSoSL8FkHSzzA";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=12&client_id=${accessKey}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res)
        setData((prev) => {
          let arr = [...prev, ...res.results.map((elem) => elem.urls.small)];
          return Array.from(new Set(arr));
        });
      })
      .finally(() => setLoading(false));
  };

  const handleInfiniteScroll = () => {
    console.log(window.innerHeight); // height of web page visible
    console.log(document.documentElement.scrollTop); // distance of scroll bar from top
    console.log(document.documentElement.scrollHeight); // total height of scroll

    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
   window.addEventListener('scroll', handleInfiniteScroll) 

   return () => window.removeEventListener('scroll',handleInfiniteScroll)
  },[]);

  useEffect(() => {
    let timeId = setTimeout(() => {
      fetchData();
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, [query, page]);

  const inputChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <div className="input">
        <input type="text" name="" id="" onChange={inputChange} />
      </div>
      <div className="output" style={{width:'80%',margin:'100px auto 50px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gridGap:'40px'}}>
        {data && data.map((title, idx) =>  <img style={{height:'500px',width:'300px'}} key={idx} src={title} /> )}
      {loading && <h4>Loading...</h4>}
      </div>
    </>
  );
};

export default SearchBar;
