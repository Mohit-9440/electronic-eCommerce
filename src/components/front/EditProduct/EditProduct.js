import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import data from "../../back/Data/Data"; 
import './EditProduct.css'
import toast from 'react-hot-toast';

const EditProduct = () => {
    const {id} = useParams();
    const { productItems } = data;
    
    const[name, setName] = useState('');
    const[image, setImage] = useState();
    const[description, setDescription] = useState('');
    const[category, setCategory] = useState('');
    const[price, setPrice] = useState('');
    const[ratings, setRatings] = useState('');
    const[imgbase64, setImgbase64] = useState();
    
    const[product, setProduct] = useState();


    const getLocalStorageData = localStorage.getItem('appData'); 
    const appData = getLocalStorageData !== '[object Object]' && JSON.parse(getLocalStorageData) 
  
    useEffect(() => (
      setProduct(appData?.find(e => e.id == id))
    ), [])
    

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        appData ? 
  localStorage.setItem('appData',  JSON.stringify(
    appData.map(data => (
      data.id == id ? {
        id: data.id,
        name,
        description,
        price,
        ratings,category,
        image : imgbase64
    }: data
    ))

) ) : 
localStorage.setItem('appData',  JSON.stringify(
  productItems.map(data => (
    data.id == id ? {
      id: data.id,
      name,
      description,
      price,
      ratings,category,
      image : imgbase64
  }: data
  ))
) ) 

toast.success('Updated Successfully!!')

    }

    return (
        <>
        <form className='form-box' onSubmit={handleSubmit}>
            <input required type="text" id='name' placeholder='Name' defaultValue={product?.name} onChange= {(e) => setName(e.target.value)}/>
            <input required type='file' id='image' placeholder='Image' onChange= {(e) => handleImage(e)}/>
            <input required type="text" id='description' placeholder='Description' defaultValue={product?.description} onChange= {(e) => setDescription(e.target.value)} />
            <input required type="number" id='price' placeholder='Price' defaultValue={product?.price} onChange= {(e) => setPrice(e.target.value)}/>
            <input required type="number" step={0.1} min={0} max={5} id='ratings' placeholder='Ratings' defaultValue={product?.ratings} onChange= {(e) => setRatings(e.target.value)} />
            <select required onChange= {(e) => setCategory(e.target.value)}>
                <option>Wearables</option>
                <option>Sound</option>
                <option>Home</option>
                <option>Kitchen</option>
                <option>Computer</option>
                <option>Mobile</option>
                <option>Others</option>

            </select>
            <button className='btn' type='submit'>Save Changes</button>

        </form>
        </>
  )
}

export default EditProduct