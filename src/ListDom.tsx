import { ChangeEvent, useEffect, useState } from 'react';
import './ListDom.css';
import axios from 'axios';

export const ListRecord = () => {
    const [userNumberSort, setUserNumberSort]:any[] = useState([]);
    const [countryUser, setCountryUser]:any[] = useState([]);
    const [selectCountry, setSelectCountry] = useState('All');
    const [countryList, setCountryList]:any[] = useState([]);
    const [genderVal, setGenderVal] = useState('All');
    const [genderValList, setGenderValList]:any[] = useState([]);
    const [listValue, setListValue]: any = useState([]);
    const getList = async() => {
      try {
        const result = await axios({
            url:'https://randomuser.me/api/?results=100',
        })
        console.log(result?.data?.results);
        
        if(result && result?.data?.results) {
            setListValue(result?.data?.results)
            setGenderValList(result?.data?.results)
            setCountryUser(result?.data?.results)
            let obj: any = {}
            for(let i = 0 ; i < result?.data?.results.length; i++) {
                console.log()
                if(obj[result?.data?.results[i]?.location?.country]){
                    obj[result?.data?.results[i]?.location?.country] += 1
                }else{
                    obj[result?.data?.results[i]?.location?.country] = 1
                }
            }
            const newArr:any[] = [] 
            const countryArr:string[] = [] 
            for(let key in obj){
                newArr.push({
                    country: key,
                    num: obj[key]
                })
                countryArr.push(key)
            }
            newArr.sort(function(a, b){return b.num - a.num});
            setUserNumberSort(newArr)
            setCountryList(countryArr)
            console.log(newArr,countryArr)
        }
    } catch(error){
        console.log(error)
    }
    }
    useEffect(() => {
        getList()
    }, [])
    const getCurData = (value?: string) => {
        console.log(value);
        
        let newList: any[] = []
        if(value === 'All') {
            newList = listValue
        }  else {
            listValue.forEach((element: { gender: string; }) => {
                if(value && element.gender === value) {
                    newList.push(element)
                }
            });
        }
        setGenderValList(newList)
        setGenderVal(value || '')
        console.log(newList)
    }
    const getCountryUser = (value?: string) => {
        // setCountryUser
        let newList: any[] = []
        if(value === 'All') {
            newList = listValue
        }  else {
            listValue.forEach((element: { location: { country: string; }; }) => {
                if(value && element?.location?.country === value) {
                    newList.push(element)
                }
            });
        }
        setCountryUser(newList)
        setSelectCountry(value || '')
    }
    return (
        <div>
            <h4>Render a list of Countries sorted by the number of Users in each country</h4>
            <div className='countrySort'>
                <div className='heardCell'>
                    <div>country</div>
                    <div className='numberStyle'>number</div>
                </div>
                {userNumberSort.map((val : any, index: any) => (
                    <div className='heardCell' key={index}>
                        <div>{val?.country || ''}</div>
                        <div className='numberStyle'>{val?.num || ''}</div>
                    </div>
                ))}
            </div>
            <h4>Only one country's users should be visible at once</h4>
            <select value={selectCountry}  onChange={e => getCountryUser(e.target.value)} >
                <option value="All">All</option>
                {countryList.map((val : any, index: any) => (
                    <option key={index} value={val}>{val || ''}</option>
                ))}
            </select>
            <div className='countrySort'>
                <div className='heardCell'>
                    <div>country</div>
                    <div className='numberStyle'>name</div>
                </div>
                {countryUser.map((val : any, index: any) => (
                    <div className='heardCell' key={index}>
                        <div>{val?.location?.country || ''}</div>
                        <div className='numberStyle'>{val?.name?.title || ''} {val?.name?.first || ''} {val?.name?.last || ''}</div>
                    </div>
                ))}
            </div>
            <h4>There should be a dropdown that filters the Users by Gender (Male, Female, All)</h4>
            <select value={genderVal}  onChange={e => getCurData(e.target.value)} >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="All">All</option>
            </select>
            <div className='countrySort'>
                <div className='heardCell'>
                    <div>name</div>
                    <div className='numberStyle'>gender</div>
                </div>
                {genderValList.map((val : any, index: any) => (
                    <div className='heardCell' key={index}>
                        <div>{val?.name?.title || ''} {val?.name?.first || ''} {val?.name?.last || ''}</div>
                        <div className='numberStyle'>{val?.gender || ''}</div>
                    </div>
                ))}
            </div>
        </div>
        // {listValue}
        // {listValue.map(({ val, label }: any, index: any) => (
            
        // ))}
    );
};
