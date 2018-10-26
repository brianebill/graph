`It’s time to transition to the client side where we’ll create a form that can manage photo uploads.

Use a File Service - In a real Node.js application, you would typically save user uploads to a cloud-based file storage service.

The previous example uses an uploadFile function to upload the file to a local directory, which limits the scalability of this sample application. Services such as AWS, Google Cloud, or Cloudinary can handle large volumes of file uploads from distributed applications.

Posting a New Photo with Apollo Client - Now, let’s handle the photos on the client.

First to display the photos, we’ll need to add the allPhotos field to our ROOT_QUERY. Modify the following query in the src/App.js file:`

export const ROOT_QUERY = gql`
  query allUsers {
      totalUsers
      totalPhotos
      allUsers { ...userInfo }
      me { ...userInfo }
      allPhotos {
          id
          name
          url
      }
  }
  fragment userInfo on User {
      githubLogin
      name
      avatar
  }
`

`Now when the website loads, we will receive the id, name, and url of every photo stored in the database. We can use this information to display the photos. Let’s create a Photos component that will be used to display each photo: `

import React from 'react'
import { Query } from 'react-apollo'
import { ROOT_QUERY } from './App'
const Photos = () =>
  <Query query={ALL_PHOTOS_QUERY}>
    {({ loading, data}) => loading ?
      <p>loading...</p> :
      data.allPhotos.map(photo => <img key={photo.id} src={photo.url} alt ={photo.name} width ={ 350} />
    )}
  </ Query >

export default Photos

`Remember, the Query component takes in the ROOT_QUERY as a property.

Then, we use the render prop pattern to display all of the photos when loading is complete.

For each photo in the data.allPhotos array, we’ll add a new img element with metadata that we pull from each photo object including the photo.url and photo.name.

When we add this code to the App component, our photos will be displayed. But first, let’s create another component.

Let’s create a PostPhoto component that will contain the form: `

import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const POST_PHOTO_MUTATION = gql`
    mutation postPhoto($input: PostPhotoInput!) {
        postPhoto(input:$input) {
            id
            name
            url
        }
    }
`
export default class PostPhoto extends Component {

    state = {
        name: '',
        description: '',
        category: 'PORTRAIT',
        file: ''
    }

    postPhoto = async (mutation) => {
        await mutation({
            variables: {
                input: this.state
            }
        }).catch(console.error)
        this.props.history.replace('/')
    }

    render() {
        return (
            <form onSubmit={e => e.preventDefault()}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>

                <h1>Post a Photo</h1>

                <input type="text"
                    style={{ margin: '10px' }}
                    placeholder="photo name..."
                    value={this.state.name}
                    onChange={({target}) => this.setState({ name: target.value })} />

                <textarea type="text"
                    style={{ margin: '10px' }}
                    placeholder="photo description..."
                    value={this.state.description}
                    onChange={({target}) => this.setState({ description: target.value })} />

                <select value={this.state.category}
                    style={{ margin: '10px' }}
                    onChange={({target}) => this.setState({ category: target.value })}>
                    <option value="PORTRAIT">PORTRAIT</option>
                    <option value="LANDSCAPE">LANDSCAPE</option>
                    <option value="ACTION">ACTION</option>
                    <option value="GRAPHIC">GRAPHIC</option>
                </select>

                <input type="file"
                    style={{ margin: '10px' }}
                    accept="image/jpeg"
                    onChange={({target}) => this.setState({
                        file: target.files && target.files.length ? target.files[0] : ''
                    })} />

                <div style={{ margin: '10px' }}>
                    <Mutation mutation={POST_PHOTO_MUTATION}>
                        {mutation =>
                            <button onClick={() => this.postPhoto(mutation)}>
                                Post Photo
                            </button>
                        }
                    </Mutation>
                    <button onClick={() => this.props.history.goBack()}>
                        Cancel
                    </button>
                </div>

            </form>
        )
    }

}

`The PostPhoto component is simply a form. This form uses input elements for the name, description, category, and the file itself.

In React, we call this controlled because each input element is linked to a state variable. Any time an input’s value changes, the state of the PostPhoto component will change too.

We submit photos by pressing the “Post Photo” button. The file input accepts a JPEG and sets the state for file. This state field represents the actual file, not just text.

We have not added any form validation to this component for brevity.
`
