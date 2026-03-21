import { FileText, Eye, Image as ImageIcon, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { adminAPI } from "../../../lib/api";

interface AssetData {
  _id: string;
  cloudinaryId: string;
  url: string;
  type: string;
  createdAt: string;
  userId?: { name: string; email: string };
}

export default function AdminAssets() {
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminAPI.getAssets()
      .then((res) => setAssets(res.data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#3B2F2F] mb-8">Asset Library</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="text-4xl font-bold text-[#3B2F2F] mb-2">{assets.length}</div>
          <div className="text-sm text-gray-500">Total Assets (Cloudinary)</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="text-4xl font-bold text-[#3B2F2F] mb-2">{assets.filter(a => a.type === 'image').length}</div>
          <div className="text-sm text-gray-500">Images</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="text-4xl font-bold text-[#3B2F2F] mb-2">{assets.filter(a => a.type === 'file').length}</div>
          <div className="text-sm text-gray-500">Files</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#3B2F2F]">Cloudinary Assets</h2>
        </div>
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="size-8 border-3 border-gray-300 border-t-[#D6A85F] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading assets...</p>
          </div>
        ) : assets.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No assets uploaded yet. Run <code className="bg-gray-100 px-2 py-1 rounded">npm run seed</code> to populate.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Preview</th>
                <th className="px-6 py-4 font-medium">Cloudinary ID</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Uploaded</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assets.map((asset) => (
                <tr key={asset._id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    {asset.type === 'image' ? (
                      <img src={asset.url} alt="" className="size-12 object-cover rounded-lg border border-gray-200" />
                    ) : (
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-500 w-fit">
                        <FileText className="size-5" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-700 truncate block max-w-xs">{asset.cloudinaryId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      asset.type === 'image' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(asset.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={asset.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="View">
                        <ExternalLink className="size-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}