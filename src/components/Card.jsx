// import logoPng from '../assets/images/bgdrop.png';

// export const Card = ({props, uniqueId, onProdClick}) => {

//     const { employeeName, datePosted, tag, title, description } = props;

//     const truncatedDescription = description.length > 30 ? description.substring(0, 45) + "..." : description;

//     function handleClick() {
//         console.log("Card clicked with Unique ID: ", uniqueId);
//         onProdClick();

//     }

//   return (
//     <div className="box-border shadow-lg py-4 px-2 rounded-lg flex flex-col relative w-64
//                     transition-transform transform hover:scale-105 hover:shadow-xl"
//          onClick={handleClick}>
//       <div className="flex justify-center relative">

//         <img className="w-52 h-48 rounded-md object-cover m-0" 
//             src={logoPng} 
//             alt="Product" />
//         <button className="absolute top-2 right-2">
//           ❤️ 
//         </button>

//         <h4 className='absolute bottom-1 left-5 bg-slate-600 text-slate-100 text-xs rounded-md p-1'>{tag}</h4>

//       </div>

//         <h1 className="mt-4 text-lg font-semibold text-center">{title}</h1>
//         <p className="mt-2 text-gray-600 text-center">{truncatedDescription}</p>
   
//       <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
//         <span>Posted by: {employeeName}</span>
//         <span>{datePosted}</span>
//       </div>

//     </div>
//   );
// };



export const Card = ({ props, onProdClick }) => {
  const { ntId, productName, description, purchaseDate, dateListed, category, image, price } = props;

  const truncatedDescription = description.length > 30 ? description.substring(0, 45) + "..." : description;

  function handleClick() {
      onProdClick();
  }

  // Formatting the purchaseDate to a readable format
  const formattedPurchaseDate = new Date(purchaseDate).toLocaleDateString();
  const formattedDateListed = new Date(dateListed).toLocaleDateString();

  return (
      <div className="box-border shadow-lg py-4 px-2 rounded-lg flex flex-col relative w-64
                      transition-transform transform hover:scale-105 hover:shadow-xl"
          onClick={handleClick}>
          <div className="flex justify-center relative">
              <img className="w-52 h-48 rounded-md object-cover m-0" 
                   src={image || logoPng} alt="Product" />
              <button className="absolute top-2 right-2">❤️</button>
              <h4 className="absolute bottom-1 left-5 bg-slate-600 text-slate-100 text-xs rounded-md p-1">{category}</h4>
          </div>

          <h1 className="mt-4 text-lg font-semibold text-center">{productName}</h1>
          <p className="mt-2 text-gray-600 text-center">{truncatedDescription}</p>

          <div className="mt-2 text-gray-500 text-center text-sm">
              <p><strong>Purchase Date:</strong> {formattedPurchaseDate}</p>
              <p><strong>Listed On:</strong> {formattedDateListed}</p>
              <p><strong>Category:</strong> {category}</p>
              <p><strong>Price:</strong> ₹{price}</p>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>Posted by: {ntId}</span>
          </div>
      </div>
  );
};
