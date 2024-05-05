import { ChangeEvent, useEffect, useState } from 'react';
import './ListDom.css';
import axios from 'axios';

export const ListRecord = () => {
    const [userNumberSort, setUserNumberSort]:any[] = useState([]);
    const [countryUser, setCountryUser]:any[] = useState([]);
    const [selectCountry, setSelectCountry] = useState('All');
    const [clickCountry, setClickCountry] = useState('');
    const [clickCountryList, setClickCountryList]:any[] = useState([]);
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
    const clickCountryFunction = (val: any) => {
        let newArr:any [] = []
        for(let i = 0 ; i < listValue.length; i++) {
            console.log()
            if(val === listValue[i]?.location?.country){
                newArr.push(listValue[i])
            }
        }
        setClickCountryList(newArr)
        setClickCountry(val)
    }
    return (
        <div>
            <h4>Render a list of Countries sorted by the number of Users in each country</h4>
            <div className='tableStyle'>
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
            <h4>Clicking a country should expand the list of users in that country sorted by the date registered most recent first</h4>
            <div className='countrySort'>
                <div className='leftData'>
                    <div className='countryHeardCell'>
                        <div>country</div>
                    </div>
                    {userNumberSort.map((val : any, index: any) => (
                        <div className='countryHeardCell hoverStyle' key={index}>
                            <div className={clickCountry === val?.country ? 'clickStyle' : ''} onClick={() => {clickCountryFunction(val?.country)}}>{val?.country || ''}</div>
                        </div>
                    ))}
                </div>
                <div className='rightData'>
                    <div className='heardCell'>
                        <div>Name</div>
                        <div className='numberStyle'>Gender</div>
                        <div className='numberStyle'>City</div>
                        <div className='numberStyle'>State</div>
                        <div className='numberStyle'>Date Registered</div>
                    </div>
                    {clickCountryList && clickCountryList.length > 0 ? clickCountryList?.map((val : any, index: any) => (
                        <div className='heardCell' key={index}>
                            <div>{val?.name?.first || ''} {val?.name?.last || ''}</div>
                            <div className='numberStyle'>{val?.gender || ''}</div>
                            <div className='numberStyle'>{val?.location?.city || ''}</div>
                            <div className='numberStyle'>{val?.location?.state || ''}</div>
                            <div className='numberStyle'>{val?.registered?.date || ''}</div>
                        </div>
                    )) : 'Please select the country on the left'}
                </div>
            </div>
            <h4>Only one country's users should be visible at once</h4>
            <select value={selectCountry}  onChange={e => getCountryUser(e.target.value)} >
                <option value="All">All</option>
                {countryList.map((val : any, index: any) => (
                    <option key={index} value={val}>{val || ''}</option>
                ))}
            </select>
            <div className='tableStyle'>
                <div className='heardCell'>
                    <div>Country</div>
                    <div className='numberStyle'>Name</div>
                    <div className='numberStyle'>Gender</div>
                    <div className='numberStyle'>City</div>
                    <div className='numberStyle'>State</div>
                    <div className='numberStyle'>Date Registered</div>
                </div>
                {countryUser.map((val : any, index: any) => (
                    <div className='heardCell' key={index}>
                        <div>{val?.location?.country || ''}</div>
                        <div className='numberStyle'>{val?.name?.first || ''} {val?.name?.last || ''}</div>
                        <div className='numberStyle'>{val?.gender || ''}</div>
                        <div className='numberStyle'>{val?.location?.city || ''}</div>
                        <div className='numberStyle'>{val?.location?.state || ''}</div>
                        <div className='numberStyle'>{val?.registered?.date || ''}</div>
                    </div>
                ))}
            </div>
            <h4>There should be a dropdown that filters the Users by Gender (Male, Female, All)</h4>
            <select value={genderVal}  onChange={e => getCurData(e.target.value)} >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="All">All</option>
            </select>
            <div className='tableStyle'>
                <div className='heardCell'>
                    <div>Country</div>
                    <div className='numberStyle'>Name</div>
                    <div className='numberStyle'>Gender</div>
                    <div className='numberStyle'>City</div>
                    <div className='numberStyle'>State</div>
                    <div className='numberStyle'>Date Registered</div>
                </div>
                {genderValList.map((val : any, index: any) => (
                    <div className='heardCell' key={index}>
                        <div>{val?.location?.country || ''}</div>
                        <div className='numberStyle'>{val?.name?.first || ''} {val?.name?.last || ''}</div>
                        <div className='numberStyle'>{val?.gender || ''}</div>
                        <div className='numberStyle'>{val?.location?.city || ''}</div>
                        <div className='numberStyle'>{val?.location?.state || ''}</div>
                        <div className='numberStyle'>{val?.registered?.date || ''}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
