import { useState } from 'react';
import { useSelector } from 'react-redux';

import Popup from 'components/common/popup/popup';
import Interface from 'components/common/popup/interface/menu-bar/menu';

import "./index.sass";


const apiPostReq = async (data, files) => {
    const url = `${process.env.REACT_APP_HOST}/api/repport/`;

    const formData = new FormData();
    
    files.forEach((element, id) => {
        formData.append(`img-${id}`, element);
    });

    Object.keys(data).forEach(key=> {
        formData.append(key, data[key]);
    });

    const getCookie = name => {
        let cookieValue = '';
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

   return await (
    await fetch(url, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
        },
        body: formData

    }).catch()).json();

}


function RepportPopup({ onClose }) {
    const [message, setMessage] = useState('');
    const [theme, setTheme] = useState('');
    const [email, setEmail] = useState('');
    const [selectedImage, setSelectedImage] = useState([]);

    const state = useSelector(state => state.popups.isReporting);
    
    const HandeSend = (event) => {
        setSelectedImage([]);
        setMessage('')
        event.preventDefault();
        const data = {
            subject: theme,
            email: email,
            message: message,
        }
        apiPostReq(data, selectedImage);
        onClose();
    };
    
    const addPic = event => {
        if (selectedImage.length < 4) {
            setSelectedImage([...selectedImage, event.target.files[0]]);
        } else {
            setSelectedImage([...selectedImage.filter((e,i) => i!==0), event.target.files[0]]);
        }
    };

    const autoDestroy = id => {
        setSelectedImage(selectedImage.filter( ( _, index) => index!==id ))
    }

    return (
        <Popup isOpen={state} name='repport'>
            <Interface onClose={onClose}/>
            <div className="view--repport">
                <form className="view__inner--repport" onSubmit={e => HandeSend(e)} enctype="multipart/form-data">
                    <div className="view__common-info">
                        <div className="view__mail">
                            <label id="mail">Email:</label>
                            <input type="email" id="mail" className='' onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="view__problem-name">
                            <label id="mail">Problem:</label>
                            <select name="problems" id="pet-select" onChange={e => setTheme(e.target.value)}>
                                <option value="other">--Please choose--</option>
                                <option value="ui">UI problem</option>
                                <option value="trasformation">Trasformation problem</option>
                                <option value="settings">Settings problem</option>
                                <option value="other">Other..</option>
                            </select>
                        </div>
                    </div>
                    <textarea className='view__problem-description'
                            placeholder='Please describe your issue'
                            value={message}
                            onChange={e => setMessage(e.target.value)}>
                    </textarea>
                    <div className="screnshots-list">
                        {selectedImage.length > 0 && <div className="images__list">
                            {
                                selectedImage.map( (element, id) => {
                                    return ( <img className='screnshot' 
                                            onClick={() => autoDestroy(id)}
                                            src={URL.createObjectURL(element)} />
                                            )
                                })
                            }
                            </div>
                        }
                        <input
                                type="file"
                                id="screenTaker"
                                style={{display: "none"}}
                                onChange={addPic}
                                multiple
                            />
                        <label className='transformation__btn addscreen-btn' for="screenTaker">Add Screnshot</label>
                    </div>
                    <div className="transform__menu">
                        <button className="transformation__btn send">Send</button>
                    </div>
                </form>      
            </div>
        </Popup>
    )
}

export default RepportPopup;