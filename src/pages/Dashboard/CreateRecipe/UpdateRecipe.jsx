import React, { useEffect, useState } from 'react';
import Editor from '@stfy/react-editor.js';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import tableUmd from '@editorjs/table';
import markerUmd from '@editorjs/marker';
import axios from 'axios'; // Import axios
import { Button } from '../../../components/ui/button';
import { useUserContext } from '../../../context/UserContext';
import { toast } from 'react-toastify';
import { getAsingleRecipe } from '../../../Utils/query';
import { useParams } from 'react-router-dom';

function Update(props) {
    const [title, setTitle] = useState('');
    const [recipe, setRecipe] = useState()
    const [loading, setLoading] = useState('')
    const { user } = useUserContext();
    let { id } = useParams();


    useEffect(() => {
        getAsingleRecipe(id).then((res) => {
            setTitle(res.data.title);
            setRecipe(res.data.recipe);
        });
    }, [id]);

    const handleTitleChange = (event) => {
        if (event.target.value.length <= 85) {
            setTitle(event.target.value);
        }
    };
// console.log(JSON.parse(recipe))
console.log(recipe)
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const requestData = {
                title: title,
                recipe: [JSON.parse(recipe)],
                userid: user._id,
            };

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/recipe/update/${id}`, requestData);

            if (response.data.success) {
                toast.success('Recipe Updated Successfully!');
                console.log('Recipe updated successfully:', response.data);
            } else {
                toast.error('Failed to update recipe, please try again!');
                console.log('Failed to update recipe');
            }

            setLoading(false);
        } catch (error) {
            console.error('Error updating recipe:', error);
            setLoading(false);
        }
    };



    return (
        <>
            <div className='w-full'>
                <div className='flex justify-center'>
                    <textarea
                        className='w-3/5 mx-auto p-5 lg:text-4xl text-3xl font-bold  min-h-28  text-black  dark:text-white bg-transparent  
                       scrollbar-hidden border-transparent focus:border-transparent focus:ring-0 focus:outline-none
                       active:border-none text-wrap'
                        aria-expanded="false"
                        placeholder='Write A Fancy Title, e.g. Heavenly Delights: Gourmet Symphony of Irresistible Cookies'
                        value={title}

                        onChange={handleTitleChange}
                        maxLength={85}
                    />
                </div>
                <Editor
                    holder='editor'
                    onData={(data) => {
                        setRecipe(JSON.stringify(data));
                    }}
                    tools={{
                        header: Header,
                        image: {
                            class: ImageTool,
                            inlineToolbar: true,
                            config: {
                                endpoints: {
                                    byFile: `${process.env.REACT_APP_BACKEND_URL}/uploadImage/uploadFile`,
                                    byUrl: `${process.env.REACT_APP_BACKEND_URL}/uploadImage/uploadFile`
                                }
                            },
                        },
                        table: {
                            class: tableUmd,
                            inlineToolbar: true,
                            config: {
                                rows: 2,
                                cols: 3,
                            },
                        },
                        Marker: {
                            class: markerUmd,
                            shortcut: 'CMD+SHIFT+M',
                        },
                        list: {
                            class: List,
                            inlineToolbar: true,
                            config: {
                                defaultStyle: 'unordered', // or 'ordered' for ordered lists
                            },
                        },
                    }}
                    onReady={() => toast.success("Write a Delicious Recipe!")}
                    data={recipe?.blocks}
                />
                <div id="editor" className='z-10  h-auto' />
            </div>
            <div className='flex justify-center -mt-40 pb-10 z-50'>

                <Button className="w-3/4 mx-auto z-50" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish Recipe'}
                </Button>            </div>
        </>
    );
}

export default Update;
