import { useState } from "react";
import Input from "../Inputs/input.jsx";

const DownloadExcelForm = ({onDownload, content}) => {
    const [month, setMonth] = useState("");

    return (
        <div>
            <p className="text-sm text-gray-600 mb-5">{content}</p>
            <Input
                value={month}
                onChange={({target})=>setMonth(target.value)}
                label="Select Month (MM/YYYY)"
                placeholder=""
                type="month"
            />
            <div className="flex justify-end mt-6">
                <button type="button"
                className="add-btn add-btn-fill"
                onClick={()=>onDownload(month)}
                disabled={!month}
                >
                    Download Excel Details
                </button>
            </div>
        </div>
    )
}

export default DownloadExcelForm