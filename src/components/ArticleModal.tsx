
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  image?: string;
  date?: string;
  source?: string;
}

const ArticleModal = ({
  isOpen,
  onClose,
  title,
  content,
  image,
  date,
  source
}: ArticleModalProps) => {
  const [contentReady, setContentReady] = useState(false);

  // Simulate content loading
  useState(() => {
    if (isOpen) {
      setTimeout(() => setContentReady(true), 100);
    } else {
      setContentReady(false);
    }
  });

  const paragraphs = content.split("\n\n");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 z-10 bg-white dark:bg-background p-6 pb-2 border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-8">
              <DialogTitle className="text-2xl font-bold text-finance-primary">{title}</DialogTitle>
              {(source || date) && (
                <DialogDescription>
                  {source && <span className="font-medium">{source}</span>}
                  {source && date && <span className="mx-2">•</span>}
                  {date && <span className="text-muted-foreground">{date}</span>}
                </DialogDescription>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <AnimatePresence>
          {contentReady && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="p-6 pt-4"
            >
              {image && (
                <div className="mb-6">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-auto max-h-[400px] object-cover rounded-md"
                  />
                </div>
              )}

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    className="mb-4"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;
