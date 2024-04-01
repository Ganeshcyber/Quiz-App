
import Link from 'next/link';


const Categories = () => {
  return (
    <>
      <h2>Select Categories</h2>
      <table className='categories'>
        {/* <h2>Welcome , {name || Guest}</h2> */}
        <tbody>
          <tr>
            <td>
              <Link href="/animal" >
                Animals
              </Link>
            </td>
            <td>
              <Link href="/" style={{textDecoration: " none" , color: "Black" , fontSize: "30px"}}>
                Gk
              </Link>
            </td>
          </tr>

          <tr>
            <td>
              <Link href="/" style={{textDecoration: " none" , color: "Black" , fontSize: "30px"}}>
               politics
              </Link>
            </td>
            <td>
              <Link href="/" style={{textDecoration: " none" , color: "Black" , fontSize: "30px"}}>
               sports
              </Link>
            </td>
          </tr>
         
        </tbody>
      </table>
    </>
  );
};

export default Categories;





