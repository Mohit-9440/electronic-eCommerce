import React,{useState} from 'react'
import data from "../../back/Data/Data"; 
import './AddProduct.css';
import toast from 'react-hot-toast';

const AddProduct = () => {
    
  const { productItems } = data;
    const[name, setName] = useState('');
    const[image, setImage] = useState();
    const[description, setDescription] = useState('');
    const[category, setCategory] = useState('');
    const[price, setPrice] = useState('');
    const[ratings, setRatings] = useState('');
    const[imgbase64, setImgbase64] = useState();

    const getLocalStorageData = localStorage.getItem('appData'); 
    const appData = getLocalStorageData !== '[object Object]' && JSON.parse(getLocalStorageData) 

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

      
    const handleImage = async (e) => {
        setImage(e.target.files[0])
  const base64 = await convertToBase64(e.target.files[0]); 
  setImgbase64(base64) 
      }
 
    let randomId = Math.floor((Math.random() * 100000) + 1);


    const handleSubmit = async (e) => {
        e.preventDefault();
        appData ? 
  localStorage.setItem('appData',  JSON.stringify([
    ...appData,
    {
        id: randomId,
        name,
        description,
        price,
        ratings,category,
        image : imgbase64
    }

]) ) : 
localStorage.setItem('appData',  JSON.stringify([
    ...productItems,
    {
        id:randomId,
        name,
        description,
        price,
        ratings,category,
        image : imgbase64
    }

]) )

toast.success('Added Successfully!!')


    }

    return (
        <div className='form-box-add'>
        <form onSubmit={handleSubmit}>
            <input required type="text" id='name' className='add-name' placeholder='Name' defaultValue={name} onChange= {(e) => setName(e.target.value)}/>
            <input required type='file' id='image' placeholder='Image' onChange= {(e) => handleImage(e)}/>
            <input required type="text" id='description' placeholder='Description' defaultValue={description} onChange= {(e) => setDescription(e.target.value)} />
            <input required type="number" id='price' placeholder='Price' defaultValue={price} onChange= {(e) => setPrice(e.target.value)}/>
            <input required type="number" step={0.1} min={0} max={5} id='ratings' placeholder='Ratings' defaultValue={ratings} onChange= {(e) => setRatings(e.target.value)} />
            <div className="category-select">

            <select required onChange= {(e) => setCategory(e.target.value)}>
                <option>Wearables</option>
                <option>Sound</option>
                <option>Home</option>
                <option>Kitchen</option>
                <option>Computer</option>
                <option>Mobile</option>
                <option>Others</option>

            </select>
            </div>
            <button className='btn' type='submit'>Add Product</button>

        </form>
        </div>
  )
}

export default AddProduct