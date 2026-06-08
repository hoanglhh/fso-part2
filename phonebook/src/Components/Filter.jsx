const Filter = ({filter, handleFilter}) => {
    return (
    <form>
        <div>
          filer shown with <input 
          value={filter}
          onChange={handleFilter}/>
        </div>
      </form>
    )
}

export default Filter