import { useRef } from 'react';
import { uploadHighlights } from '../../services/highlights';

function HighlightsForm(props) {
  const { setAlert, setFetchedHighlights } = props;
  const formRef = useRef(null);

  const submit_file = async (e) => {
    e.preventDefault();
    const form_data = new FormData(formRef.current);
    await uploadHighlights(form_data);
    setAlert(true);
    setFetchedHighlights(false);
  };

  return (
    <form onSubmit={submit_file} ref={formRef}>
      <input
        type='number'
        name='finishedBookId'
        value={props.finishedBookId}
        hidden
        readOnly
      />
      <input
        type='file'
        name='highlights-file'
        required
        className='my-3 mx-3 px-3 py-2 border border-gray-300 rounded-md dark:bg-neutral-800 dark:border-none'
      />
      <input
        type='submit'
        value='Submit'
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded dark:bg-green-500/50 dark:hover:bg-green-700/50'
      />
    </form>
  );
}

export default HighlightsForm;
