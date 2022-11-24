import ImageUploader from "react-images-upload";

interface Props {
    imgExtension?: string[];
    maxFileSize?: number;
    handleChange: (pictures: Array<any>) => void;
}

function UploadComponent(props: Props) {
    const onDrop = (pictureFiles: any, pictureDataURLs: any) => {
      props.handleChange(pictureDataURLs);
    };
  
      return (
        <ImageUploader
          withIcon={false}
          withLabel={false}
          withPreview={true}
          buttonText={"Dodaj zdjęcia"}
          fileSizeError={"Rozmiar pliku jest za duży!"}
          fileTypeError={"Niedozwolony format pliku!"}
          onChange={onDrop}
          imgExtension={props.imgExtension}
          maxFileSize={props.maxFileSize}
        />
      );
  }
  
  export default UploadComponent;
