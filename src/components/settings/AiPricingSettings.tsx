import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AiPricing {
  id: string;
  creatorPhone: string;
  model: string;
  inputPrice: number;
  outputPrice: number;
  createTime: string;
}

const mockPricing: AiPricing[] = [
  {
    id: "1",
    creatorPhone: "",
    model: "text-embedding-v3",
    inputPrice: 0.0000005,
    outputPrice: 0.0000005,
    createTime: "2025-04-27",
  },
  {
    id: "2",
    creatorPhone: "",
    model: "deepseek-v3",
    inputPrice: 0.000002,
    outputPrice: 0.000008,
    createTime: "2025-04-27",
  },
];

export function AiPricingSettings() {
  const [pricingList, setPricingList] = useState<AiPricing[]>(mockPricing);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPricing, setNewPricing] = useState({
    model: "",
    inputPrice: "",
    outputPrice: "",
  });

  const handleAddPricing = () => {
    const pricing: AiPricing = {
      id: Date.now().toString(),
      creatorPhone: "18511247761",
      model: newPricing.model,
      inputPrice: parseFloat(newPricing.inputPrice) || 0,
      outputPrice: parseFloat(newPricing.outputPrice) || 0,
      createTime: new Date().toISOString().split("T")[0],
    };
    setPricingList([...pricingList, pricing]);
    setNewPricing({ model: "", inputPrice: "", outputPrice: "" });
    setDialogOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Action Bar */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              添加价格
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>添加AI单价</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-sm text-muted-foreground">模型名称</Label>
                <Input
                  value={newPricing.model}
                  onChange={(e) => setNewPricing({ ...newPricing, model: e.target.value })}
                  placeholder="例如: gpt-4o"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">输入价格 (元/个 Token)</Label>
                <Input
                  type="number"
                  step="0.0000001"
                  value={newPricing.inputPrice}
                  onChange={(e) => setNewPricing({ ...newPricing, inputPrice: e.target.value })}
                  placeholder="例如: 0.000001"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">输出价格 (元/个 Token)</Label>
                <Input
                  type="number"
                  step="0.0000001"
                  value={newPricing.outputPrice}
                  onChange={(e) => setNewPricing({ ...newPricing, outputPrice: e.target.value })}
                  placeholder="例如: 0.000002"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>取消</Button>
              <Button onClick={handleAddPricing} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                确认添加
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pricing Table */}
      <div className="glass-card rounded-lg border border-border/50 overflow-hidden flex-1">
        <div className="overflow-auto h-full">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent h-10">
                <TableHead className="text-muted-foreground font-medium py-2 text-sm">创建者手机号</TableHead>
                <TableHead className="text-muted-foreground font-medium py-2 text-sm">模型</TableHead>
                <TableHead className="text-muted-foreground font-medium py-2 text-sm">模型调用-输入(元/个 Token)</TableHead>
                <TableHead className="text-muted-foreground font-medium py-2 text-sm">模型调用-输出(元/个 Token)</TableHead>
                <TableHead className="text-muted-foreground font-medium py-2 text-sm">创建时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingList.map((pricing) => (
                <TableRow key={pricing.id} className="border-border/50 hover:bg-muted/30">
                  <TableCell className="text-muted-foreground py-3 text-sm">
                    {pricing.creatorPhone || "-"}
                  </TableCell>
                  <TableCell className="text-foreground py-3 text-sm">{pricing.model}</TableCell>
                  <TableCell className="text-muted-foreground py-3 text-sm">{pricing.inputPrice}</TableCell>
                  <TableCell className="text-muted-foreground py-3 text-sm">{pricing.outputPrice}</TableCell>
                  <TableCell className="text-muted-foreground py-3 text-sm">{pricing.createTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
