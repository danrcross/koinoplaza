import Header from "../components/Header";
import Footer from "../components/Footer";
import sampPic from "../assets/images/parsnips.png";
export default function NewProductPage() {
  function handleUpload(e) {
    console.dir(e.target);
    console.log(e.target.files);
  }
  return (
    <>
      <Header />
      <h1>New Product</h1>
      <div className="newProdDiv">
        <div>
          {/* Below is the form to upload a new Profile Photo */}
          <form>
            <label htmlFor="prodPic">
              <h3>Product Photo</h3>
            </label>
            <div className="prodPicBox">
              <img className="prodPic" alt="prod-pic" src={sampPic}></img>
              {/* The <div> below contains an input of type="file" */}
              {/* This will require an "onChange" event listener */}
              <div className="prodPicForm">
                <label htmlFor="prodPicFile"></label>
                <input
                  onChange={handleUpload}
                  type="file"
                  id="prodPicFile"
                  name="prodPicFile"
                ></input>
                <label htmlFor="prodPicUrl">Or enter a link...</label>
                <div className="inputAndSave">
                  <input type="url" id="prodPicUrl" name="prodPicUrl"></input>
                  <button>Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <form>
          <div>
            <label>
              <h3>Product Name</h3>
            </label>
            <input type="text" id="commName" name="commName"></input>
            <button>Edit</button>
          </div>
          <div>
            <label>
              <h3>Price</h3>
            </label>
            <input type="text" id="location" name="location"></input>
            <button>Edit</button>
          </div>
          <div>
            <label>
              <h3>Condition</h3>
            </label>
            <input type="text" id="condition" name="condition"></input>
            <button>Edit</button>
          </div>
          <div>
            <input type="submit" value="Add Product" />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
