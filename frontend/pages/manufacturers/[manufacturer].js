export async function getServerSideProps(context) {
    // Extract the manufacturer slug from the URL
    const { manufacturer } = context.query;
  
    // Fetch data from Django API
    const response = await fetch(`http://localhost:8000/api/${manufacturer}`);
    const data = await response.json();
  
    // Pass data to the page via props
    return { props: { data } };
  }

export default function Manufacturer({ data }) {
    return (
    <div>
      <h1></h1>
      <p dangerouslySetInnerHTML={{__html: data.data.content}}></p>
    </div>
  );
}