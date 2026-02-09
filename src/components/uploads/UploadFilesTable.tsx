import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText, Image } from "lucide-react";

interface UploadFile {
  id: string;
  thumbnail?: string;
  fileName: string;
  fileType: string;
  uploadTime: string;
  uploader: string;
  uploaderPhone: string;
  team: string;
  status: string;
}

// Mock data
const mockFiles: UploadFile[] = [
  {
    id: "1",
    fileName: "【029】双面6角高进给铣刀KE11_介绍资料_REV4.PDF",
    fileType: "pdf",
    uploadTime: "2026-02-09",
    uploader: "管理员",
    uploaderPhone: "17321391891",
    team: "京瓷",
    status: "正常",
  },
  {
    id: "2",
    fileName: "屏幕截图 2026-02-09 130634.PNG",
    fileType: "png",
    uploadTime: "2026-02-09",
    uploader: "Cici",
    uploaderPhone: "13764736607",
    team: "三菱电机自动化（中国）有限公司",
    status: "正常",
  },
  {
    id: "3",
    fileName: "PPT图片.PNG",
    fileType: "png",
    uploadTime: "2026-02-09",
    uploader: "Cici",
    uploaderPhone: "13764736607",
    team: "三菱电机自动化（中国）有限公司",
    status: "正常",
  },
  {
    id: "4",
    thumbnail: "video",
    fileName: "A2738_ZH_A_VLC ACTIVEX CONTROL VIDEO PLAYER I",
    fileType: "pdf",
    uploadTime: "2026-02-09",
    uploader: "",
    uploaderPhone: "",
    team: "ABB运动控制电子资料库",
    status: "正常",
  },
  {
    id: "5",
    fileName: "ZH_A_SYSPLANT WORKBENCH REDUNDANT SYSTEM",
    fileType: "pdf",
    uploadTime: "2026-02-09",
    uploader: "",
    uploaderPhone: "",
    team: "ABB运动控制电子资料库",
    status: "正常",
  },
  {
    id: "6",
    fileName: "08472A2739_ZH_A_NETWORK SERVICE INSTRUCTION",
    fileType: "pdf",
    uploadTime: "2026-02-09",
    uploader: "",
    uploaderPhone: "",
    team: "ABB运动控制电子资料库",
    status: "正常",
  },
  {
    id: "7",
    thumbnail: "video",
    fileName: "A2735_ZH_A_SCRIPT-TRIGGERED CONCURRENT EXE",
    fileType: "pdf",
    uploadTime: "2026-02-09",
    uploader: "",
    uploaderPhone: "",
    team: "ABB运动控制电子资料库",
    status: "正常",
  },
  {
    id: "8",
    fileName: "08472A2736_ZH_A_REUSE HISTORICAL CURVE SCREEN",
    fileType: "pdf",
    uploadTime: "2026-02-09",
    uploader: "",
    uploaderPhone: "",
    team: "ABB运动控制电子资料库",
    status: "正常",
  },
  {
    id: "9",
    fileName: "08472A2737_ZH_A_MARIADB DATABASE CONNECTION",
    fileType: "pdf",
    uploadTime: "2026-02-09",
    uploader: "",
    uploaderPhone: "",
    team: "ABB运动控制电子资料库",
    status: "正常",
  },
];

interface UploadFilesTableProps {
  searchQuery: string;
}

export function UploadFilesTable({ searchQuery }: UploadFilesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(40);

  const filteredFiles = mockFiles.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.uploader.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = 1094; // Mock total
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalItems);

  const handleDelete = (fileId: string) => {
    console.log("Delete file:", fileId);
    // TODO: Implement delete functionality
  };

  const getFileIcon = (fileType: string, hasThumbnail?: string) => {
    if (hasThumbnail === "video") {
      return (
        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
          <FileText className="w-6 h-6 text-muted-foreground" />
        </div>
      );
    }
    if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
      return (
        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
          <Image className="w-6 h-6 text-muted-foreground" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-lg border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead className="text-muted-foreground font-medium w-20">缩略图</TableHead>
            <TableHead className="text-muted-foreground font-medium">文件名称</TableHead>
            <TableHead className="text-muted-foreground font-medium w-24">文件类型</TableHead>
            <TableHead className="text-muted-foreground font-medium w-28">上传时间</TableHead>
            <TableHead className="text-muted-foreground font-medium w-20">上传者</TableHead>
            <TableHead className="text-muted-foreground font-medium w-32">上传者手机号</TableHead>
            <TableHead className="text-muted-foreground font-medium">所属团队</TableHead>
            <TableHead className="text-muted-foreground font-medium w-20">文件状态</TableHead>
            <TableHead className="text-muted-foreground font-medium w-16">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFiles.map((file) => (
            <TableRow key={file.id} className="border-border/50 hover:bg-muted/30">
              <TableCell>
                {getFileIcon(file.fileType, file.thumbnail)}
              </TableCell>
              <TableCell>
                <a 
                  href="#" 
                  className="text-primary hover:underline truncate block max-w-md"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("View file:", file.fileName);
                  }}
                >
                  {file.fileName}
                </a>
              </TableCell>
              <TableCell className="text-muted-foreground">{file.fileType}</TableCell>
              <TableCell className="text-muted-foreground">{file.uploadTime}</TableCell>
              <TableCell className="text-muted-foreground">{file.uploader || "-"}</TableCell>
              <TableCell className="text-muted-foreground">{file.uploaderPhone || "-"}</TableCell>
              <TableCell className="text-muted-foreground truncate max-w-xs">{file.team}</TableCell>
              <TableCell className="text-muted-foreground">{file.status}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 px-2"
                  onClick={() => handleDelete(file.id)}
                >
                  删除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4 p-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">每页行数</span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => {
              setRowsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-20 h-8 bg-card border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="60">60</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span className="text-sm text-muted-foreground">
          {startIndex}-{endIndex} / {totalItems.toLocaleString()}
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
